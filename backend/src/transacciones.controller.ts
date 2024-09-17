import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { TransaccionesService } from './transacciones.service';
import { CrearTransaccionDto } from './dto/create-transaction.dto';
import { EstadoTransaccion } from './entities/transaccion.entity';

@Controller('transacciones')
export class TransaccionesController {
  constructor(
    private readonly transaccionesService: TransaccionesService,
  ) {}

  @Post('crear')
  async crearTransaccion(@Body() crearTransaccionDto: CrearTransaccionDto) {
    console.log('Solicitud recibida en el backend con los siguientes datos:', crearTransaccionDto);
    
    const { productoId, monto, cardHolder, customerEmail, payment_method } = crearTransaccionDto;
    const { token, installments } = payment_method;
    
    const producto = await this.transaccionesService.getProducto(productoId);
    
    if (!producto) {
      throw new BadRequestException(`Producto con ID ${productoId} no encontrado`);
    }

    const montoNumerico = typeof monto === 'string' ? Number(monto) : monto;
    if (isNaN(montoNumerico)) {
      throw new BadRequestException(`Monto no válido: ${monto}`);
    }

    const transaccion = await this.transaccionesService.crearTransaccion(
      producto,
      montoNumerico,
      cardHolder,
      token,
      installments,
      customerEmail
    );

    return transaccion;
  }

  @Post('completar')
  async completarTransaccion(
    @Body() body: { transaccionId: number; estado: EstadoTransaccion },
  ) {
    const { transaccionId, estado } = body;

    const estadosValidos = [EstadoTransaccion.COMPLETADO, EstadoTransaccion.FALLIDO];
    if (!estadosValidos.includes(estado)) {
      throw new BadRequestException('Estado inválido');
    }

    return this.transaccionesService.completarTransaccion(transaccionId, estado);
  }
}
