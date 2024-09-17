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
exports.ProductosController = void 0;
const common_1 = require("@nestjs/common");
const productos_service_1 = require("./productos.service");
const producto_entity_1 = require("./entities/producto.entity");
let ProductosController = class ProductosController {
    constructor(productosService) {
        this.productosService = productosService;
    }
    findAll() {
        return this.productosService.findAll();
    }
    create(producto) {
        return this.productosService.create(producto);
    }
    async realizarPago(monto, numeroTarjeta, cvc, expMonth, expYear) {
        return this.productosService.realizarPagoWompi(monto, numeroTarjeta, cvc, expMonth, expYear);
    }
    async actualizarStock(id, cantidad) {
        return this.productosService.actualizarStock(id, cantidad);
    }
};
exports.ProductosController = ProductosController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [producto_entity_1.Producto]),
    __metadata("design:returntype", Promise)
], ProductosController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('pago'),
    __param(0, (0, common_1.Body)('monto')),
    __param(1, (0, common_1.Body)('numeroTarjeta')),
    __param(2, (0, common_1.Body)('cvc')),
    __param(3, (0, common_1.Body)('expMonth')),
    __param(4, (0, common_1.Body)('expYear')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ProductosController.prototype, "realizarPago", null);
__decorate([
    (0, common_1.Put)(':id/actualizar-stock'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('cantidad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductosController.prototype, "actualizarStock", null);
exports.ProductosController = ProductosController = __decorate([
    (0, common_1.Controller)('productos'),
    __metadata("design:paramtypes", [productos_service_1.ProductosService])
], ProductosController);
//# sourceMappingURL=productos.controller.js.map