import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Producto } from './producto.entity';

export enum EstadoTransaccion {
  PENDIENTE = 'PENDIENTE',
  COMPLETADO = 'COMPLETADO',
  FALLIDO = 'FALLIDO',
}

@Entity()
export class Transaccion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Producto, (producto) => producto.id)
  producto: Producto;

  @Column({
    type: 'enum',
    enum: EstadoTransaccion,
    default: EstadoTransaccion.PENDIENTE,
  })
  estado: EstadoTransaccion;

  @Column()
  monto: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}

