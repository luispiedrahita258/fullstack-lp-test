import { TransaccionesService } from './transacciones.service';
import { CrearTransaccionDto } from './dto/create-transaction.dto';
import { EstadoTransaccion } from './entities/transaccion.entity';
export declare class TransaccionesController {
    private readonly transaccionesService;
    constructor(transaccionesService: TransaccionesService);
    crearTransaccion(crearTransaccionDto: CrearTransaccionDto): Promise<import("./entities/transaccion.entity").Transaccion>;
    completarTransaccion(body: {
        transaccionId: number;
        estado: EstadoTransaccion;
    }): Promise<import("./entities/transaccion.entity").Transaccion>;
}
