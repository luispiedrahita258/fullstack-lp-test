"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const axios_1 = require("axios");
const producto_entity_1 = require("./entities/producto.entity");
const dotenv = require("dotenv");
dotenv.config();
let ProductosService = class ProductosService {
    constructor(productosRepository) {
        this.productosRepository = productosRepository;
    }
    findAll() {
        return this.productosRepository.find();
    }
    create(producto) {
        if (producto.stock <= 0) {
            throw new common_1.BadRequestException('El producto debe tener un stock mayor que 0.');
        }
        return this.productosRepository.save(producto);
    }
    async realizarPagoWompi(monto, numeroTarjeta, cvc, expMonth, expYear) {
        try {
            const response = await axios_1.default.post('https://api-sandbox.co.uat.wompi.dev/v1/transactions', {
                amount_in_cents: monto * 100,
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
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
                },
            });
            return response.data;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al procesar el pago con Wompi: ' + error.message);
        }
    }
    async actualizarStock(id, cantidad) {
        const producto = await this.productosRepository.findOne({ where: { id } });
        if (!producto) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        if (producto.stock < cantidad) {
            throw new common_1.BadRequestException('Stock insuficiente');
        }
        producto.stock -= cantidad;
        return this.productosRepository.save(producto);
    }
};
exports.ProductosService = ProductosService;
exports.ProductosService = ProductosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductosService);
//# sourceMappingURL=productos.service.js.map