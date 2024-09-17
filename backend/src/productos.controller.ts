import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from './entities/producto.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  // Obtener todos los productos
  @Get()
  findAll(): Promise<Producto[]> {
    return this.productosService.findAll();
  }

  // Crear un nuevo producto
  @Post()
  create(@Body() producto: Producto): Promise<Producto> {
    return this.productosService.create(producto);
  }

  // Realizar un pago usando la integración con Wompi
  @Post('pago')
  async realizarPago(
    @Body('monto') monto: number,
    @Body('numeroTarjeta') numeroTarjeta: string,
    @Body('cvc') cvc: string,
    @Body('expMonth') expMonth: string,
    @Body('expYear') expYear: string,
  ): Promise<any> {
    return this.productosService.realizarPagoWompi(monto, numeroTarjeta, cvc, expMonth, expYear);
  }

  // Actualizar el stock de un producto después de una compra
  @Put(':id/actualizar-stock')
  async actualizarStock(
    @Param('id') id: number,
    @Body('cantidad') cantidad: number,
  ): Promise<Producto> {
    return this.productosService.actualizarStock(id, cantidad);
  }
}
