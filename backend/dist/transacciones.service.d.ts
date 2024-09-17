import { Repository } from 'typeorm';
import { Transaccion, EstadoTransaccion } from './entities/transaccion.entity';
import { Producto } from './entities/producto.entity';
export declare class TransaccionesService {
    private transaccionesRepository;
    private productosRepository;
    constructor(transaccionesRepository: Repository<Transaccion>, productosRepository: Repository<Producto>);
    getProducto(productoId: number): Promise<Producto>;
    private crearFuenteDePago;
    crearTransaccion(producto: Producto, monto: number, cardHolder: string, token: string, installments: number, customerEmail: string): Promise<Transaccion>;
    private obtenerAcceptanceToken;
    private generarFirmaIntegridad;
    realizarPagoConWompi(transaccion: Transaccion, paymentSourceId: number, acceptanceToken: string, cardHolder: string, installments: number, customerEmail: string): Promise<any>;
    completarTransaccion(id: number, estado: EstadoTransaccion): Promise<Transaccion>;
    actualizarStockProducto(producto: Producto, cantidadVendida: number): Promise<void>;
}
