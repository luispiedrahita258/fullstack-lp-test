import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Producto } from './entities/producto.entity';
import * as dotenv from 'dotenv'; // Para cargar las variables de entorno

dotenv.config(); // Cargar las variables de entorno

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  // Obtener todos los productos
  findAll(): Promise<Producto[]> {
    return this.productosRepository.find();
  }

  // Crear un nuevo producto
  create(producto: Producto): Promise<Producto> {
    if (producto.stock <= 0) {
      throw new BadRequestException('El producto debe tener un stock mayor que 0.');
    }
    return this.productosRepository.save(producto);
  }

  // Realizar pago a través de Wompi
  async realizarPagoWompi(monto: number, numeroTarjeta: string, cvc: string, expMonth: string, expYear: string): Promise<any> {
    try {
      const response = await axios.post(
        'https://api-sandbox.co.uat.wompi.dev/v1/transactions', // Endpoint de Sandbox
        {
          amount_in_cents: monto * 100, // Wompi maneja montos en centavos
          currency: 'COP',
          payment_method: {
            type: 'CARD',
            number: numeroTarjeta,
            cvc,
            exp_month: expMonth,
            exp_year: expYear,
          },
          reference: 'transaccion_ref_' + new Date().getTime(),
          customer_email: 'cliente@example.com',
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`, // Usar la clave privada
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new BadRequestException('Error al procesar el pago con Wompi: ' + error.message);
    }
  }

  // Actualizar stock de producto
  async actualizarStock(id: number, cantidad: number): Promise<Producto> {
    const producto = await this.productosRepository.findOne({ where: { id } }); // Cambiado el método findOne para TypeORM v3+
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (producto.stock < cantidad) {
      throw new BadRequestException('Stock insuficiente');
    }

    producto.stock -= cantidad;
    return this.productosRepository.save(producto);
  }
}
