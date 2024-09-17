import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { Producto } from './entities/producto.entity';
import { TransaccionesController } from './transacciones.controller';
import { TransaccionesService } from './transacciones.service';
import { Transaccion } from './entities/transaccion.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'lp_user',
      password: 'root',
      database: 'lp_test',
      entities: [Producto, Transaccion],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Producto, Transaccion]),
  ],
  controllers: [ProductosController, TransaccionesController],
  providers: [ProductosService, TransaccionesService],
})
export class AppModule {}
