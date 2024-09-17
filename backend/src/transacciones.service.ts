import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaccion, EstadoTransaccion } from './entities/transaccion.entity';
import { Producto } from './entities/producto.entity';
import * as crypto from 'crypto';
import axios from 'axios';

@Injectable()
export class TransaccionesService {
  constructor(
    @InjectRepository(Transaccion)
    private transaccionesRepository: Repository<Transaccion>,
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  async getProducto(productoId: number): Promise<Producto> {
    const producto = await this.productosRepository.findOne({ where: { id: productoId } });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto;
  }

  // Función para crear la fuente de pago
  private async crearFuenteDePago(token: string, customerEmail: string, acceptanceToken: string): Promise<number> {
    try {
      const response = await axios.post(
        'https://api-sandbox.co.uat.wompi.dev/v1/payment_sources',
        {
          type: 'CARD',
          token: token,
          customer_email: customerEmail,
          acceptance_token: acceptanceToken, 
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Fuente de pago creada:', response.data);
      return response.data.data.id;
    } catch (error) {
      console.error('Error al crear la fuente de pago:', error.response ? error.response.data : error.message);
      throw new BadRequestException(`Error al crear la fuente de pago: ${error.response ? error.response.data : error.message}`);
    }
  }

  async crearTransaccion(
    producto: Producto,
    monto: number,
    cardHolder: string,
    token: string,
    installments: number,
    customerEmail: string
  ): Promise<Transaccion> {
    if (producto.stock <= 0) {
      throw new BadRequestException('Stock insuficiente para realizar la transacción');
    }

    const transaccion = this.transaccionesRepository.create({
      estado: EstadoTransaccion.PENDIENTE,
      monto,
      producto,
    });

    const savedTransaccion = await this.transaccionesRepository.save(transaccion);

    // Obtener acceptance_token
    const acceptanceToken = await this.obtenerAcceptanceToken();

    // Crear la fuente de pago a partir del token
    const paymentSourceId = await this.crearFuenteDePago(token, customerEmail, acceptanceToken);

    // Realizar el pago con Wompi
    await this.realizarPagoConWompi(savedTransaccion, paymentSourceId, acceptanceToken, cardHolder, installments, customerEmail);

    return savedTransaccion;
  }

  private async obtenerAcceptanceToken(): Promise<string> {
    try {
      const response = await axios.get(`https://api-sandbox.co.uat.wompi.dev/v1/merchants/${process.env.WOMPI_PUBLIC_KEY}`);
      return response.data.data.presigned_acceptance.acceptance_token;
    } catch (error) {
      console.error('Error obteniendo el acceptance_token:', error.response ? error.response.data : error.message);
      throw new BadRequestException('No se pudo obtener el acceptance_token');
    }
  }

  private generarFirmaIntegridad(
    amountInCents: number,
    currency: string,
    reference: string,
    expirationTime: string,
    integrityKey: string
  ): string {
    const concatenatedString = `${reference}${amountInCents}${currency}${expirationTime}${integrityKey}`;
    // Generar el hash SHA256
    const signature = crypto.createHash('sha256').update(concatenatedString).digest('hex');
    return signature;
  }

  async realizarPagoConWompi(
    transaccion: Transaccion,
    paymentSourceId: number, // Usamos el ID de la fuente de pago en lugar del token
    acceptanceToken: string,
    cardHolder: string,
    installments: number,
    customerEmail: string
  ): Promise<any> {
    const integrityKey = process.env.WOMPI_INTEGRITY_KEY;
    const reference = `transaccion_${transaccion.id}`;
    const expirationTime = '2024-12-14T23:28:50.000Z';
    const amountInCents = transaccion.monto * 100;

    // Generar la firma con los valores correctos
    const signature = this.generarFirmaIntegridad(amountInCents, 'COP', reference, expirationTime, integrityKey);

    const transaccionPayload = {
      amount_in_cents: amountInCents,
      currency: 'COP',
      payment_method: {
        type: 'CARD',
        installments,
      },
      payment_source_id: paymentSourceId, // Usamos el paymentSourceId aquí
      reference,
      customer_email: customerEmail,
      acceptance_token: acceptanceToken,
      signature, // La firma generada correctamente
      redirect_url: 'https://mitienda.com.co/pago/resultadoppp',
      expiration_time: expirationTime,
      customer_data: {
        phone_number: '573307654321',
        full_name: cardHolder,
        legal_id: '1234567890',
        legal_id_type: 'CC',
      },
      shipping_address: {
        address_line_1: 'Calle 34 # 56 - 78',
        address_line_2: 'Apartamento 502, Torre I',
        country: 'CO',
        region: 'Cundinamarca',
        city: 'Bogotá',
        name: 'Pepe Perez',
        phone_number: '573109999999',
        postal_code: '111111',
      },
    };

    console.log('Payload enviado a Wompi:', transaccionPayload);

    try {
      const response = await axios.post('https://api-sandbox.co.uat.wompi.dev/v1/transactions', transaccionPayload, {
        headers: {
          Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Detalles del error de Wompi:', error.response ? error.response.data : error.message);
      throw new BadRequestException(`Error en la transacción con Wompi: ${JSON.stringify(error.response ? error.response.data : error.message)}`);
    }
  }

  async completarTransaccion(id: number, estado: EstadoTransaccion): Promise<Transaccion> {
    const transaccion = await this.transaccionesRepository.findOne({ where: { id }, relations: ['producto'] });

    if (!transaccion) {
      throw new NotFoundException('Transacción no encontrada');
    }

    transaccion.estado = estado;
    if (estado === EstadoTransaccion.COMPLETADO) {
      await this.actualizarStockProducto(transaccion.producto, 1);
    }

    return this.transaccionesRepository.save(transaccion);
  }

  async actualizarStockProducto(producto: Producto, cantidadVendida: number): Promise<void> {
    producto.stock -= cantidadVendida;
    if (producto.stock < 0) {
      throw new BadRequestException('Stock insuficiente');
    }
    await this.productosRepository.save(producto);
  }
}
