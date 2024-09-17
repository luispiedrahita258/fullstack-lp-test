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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaccion = exports.EstadoTransaccion = void 0;
const typeorm_1 = require("typeorm");
const producto_entity_1 = require("./producto.entity");
var EstadoTransaccion;
(function (EstadoTransaccion) {
    EstadoTransaccion["PENDIENTE"] = "PENDIENTE";
    EstadoTransaccion["COMPLETADO"] = "COMPLETADO";
    EstadoTransaccion["FALLIDO"] = "FALLIDO";
})(EstadoTransaccion || (exports.EstadoTransaccion = EstadoTransaccion = {}));
let Transaccion = class Transaccion {
};
exports.Transaccion = Transaccion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Transaccion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => producto_entity_1.Producto, (producto) => producto.id),
    __metadata("design:type", producto_entity_1.Producto)
], Transaccion.prototype, "producto", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoTransaccion,
        default: EstadoTransaccion.PENDIENTE,
    }),
    __metadata("design:type", String)
], Transaccion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Transaccion.prototype, "monto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Transaccion.prototype, "fecha", void 0);
exports.Transaccion = Transaccion = __decorate([
    (0, typeorm_1.Entity)()
], Transaccion);
//# sourceMappingURL=transaccion.entity.js.map