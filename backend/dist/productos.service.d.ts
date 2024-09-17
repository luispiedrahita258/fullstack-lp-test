import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
export declare class ProductosService {
    private productosRepository;
    constructor(productosRepository: Repository<Producto>);
    findAll(): Promise<Producto[]>;
    create(producto: Producto): Promise<Producto>;
    realizarPagoWompi(monto: number, numeroTarjeta: string, cvc: string, expMonth: string, expYear: string): Promise<any>;
    actualizarStock(id: number, cantidad: number): Promise<Producto>;
}
