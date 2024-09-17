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
exports.TransaccionesController = void 0;
const common_1 = require("@nestjs/common");
const transacciones_service_1 = require("./transacciones.service");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const transaccion_entity_1 = require("./entities/transaccion.entity");
let TransaccionesController = class TransaccionesController {
    constructor(transaccionesService) {
        this.transaccionesService = transaccionesService;
    }
    async crearTransaccion(crearTransaccionDto) {
        console.log('Solicitud recibida en el backend con los siguientes datos:', crearTransaccionDto);
        const { productoId, monto, cardHolder, customerEmail, payment_method } = crearTransaccionDto;
        const { token, installments } = payment_method;
        const producto = await this.transaccionesService.getProducto(productoId);
        if (!producto) {
            throw new common_1.BadRequestException(`Producto con ID ${productoId} no encontrado`);
        }
        const montoNumerico = typeof monto === 'string' ? Number(monto) : monto;
        if (isNaN(montoNumerico)) {
            throw new common_1.BadRequestException(`Monto no válido: ${monto}`);
        }
        const transaccion = await this.transaccionesService.crearTransaccion(producto, montoNumerico, cardHolder, token, installments, customerEmail);
        return transaccion;
    }
    async completarTransaccion(body) {
        const { transaccionId, estado } = body;
        const estadosValidos = [transaccion_entity_1.EstadoTransaccion.COMPLETADO, transaccion_entity_1.EstadoTransaccion.FALLIDO];
        if (!estadosValidos.includes(estado)) {
            throw new common_1.BadRequestException('Estado inválido');
        }
        return this.transaccionesService.completarTransaccion(transaccionId, estado);
    }
};
exports.TransaccionesController = TransaccionesController;
__decorate([
    (0, common_1.Post)('crear'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CrearTransaccionDto]),
    __metadata("design:returntype", Promise)
], TransaccionesController.prototype, "crearTransaccion", null);
__decorate([
    (0, common_1.Post)('completar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransaccionesController.prototype, "completarTransaccion", null);
exports.TransaccionesController = TransaccionesController = __decorate([
    (0, common_1.Controller)('transacciones'),
    __metadata("design:paramtypes", [transacciones_service_1.TransaccionesService])
], TransaccionesController);
//# sourceMappingURL=transacciones.controller.js.map