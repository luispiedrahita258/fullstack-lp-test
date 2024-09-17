import { Producto } from './producto.entity';
export declare enum EstadoTransaccion {
    PENDIENTE = "PENDIENTE",
    COMPLETADO = "COMPLETADO",
    FALLIDO = "FALLIDO"
}
export declare class Transaccion {
    id: number;
    producto: Producto;
    estado: EstadoTransaccion;
    monto: number;
    fecha: Date;
}
