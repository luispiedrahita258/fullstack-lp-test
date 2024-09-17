import { ProductosService } from './productos.service';
import { Producto } from './entities/producto.entity';
export declare class ProductosController {
    private readonly productosService;
    constructor(productosService: ProductosService);
    findAll(): Promise<Producto[]>;
    create(producto: Producto): Promise<Producto>;
    realizarPago(monto: number, numeroTarjeta: string, cvc: string, expMonth: string, expYear: string): Promise<any>;
    actualizarStock(id: number, cantidad: number): Promise<Producto>;
}
