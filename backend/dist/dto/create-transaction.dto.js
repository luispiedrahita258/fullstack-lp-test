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
exports.CrearTransaccionDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PaymentMethodDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El tipo de pago es obligatorio' }),
    __metadata("design:type", String)
], PaymentMethodDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El token de la tarjeta es obligatorio' }),
    __metadata("design:type", String)
], PaymentMethodDto.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Debe seleccionar un número de cuotas' }),
    (0, class_validator_1.Min)(1, { message: 'Debe seleccionar al menos una cuota' }),
    __metadata("design:type", Number)
], PaymentMethodDto.prototype, "installments", void 0);
class CrearTransaccionDto {
}
exports.CrearTransaccionDto = CrearTransaccionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del producto es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El ID del producto debe ser un número' }),
    __metadata("design:type", Number)
], CrearTransaccionDto.prototype, "productoId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El monto es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'El monto debe ser un número' }),
    __metadata("design:type", Number)
], CrearTransaccionDto.prototype, "monto", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre del titular es obligatorio' }),
    __metadata("design:type", String)
], CrearTransaccionDto.prototype, "cardHolder", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El acceptanceToken es obligatorio' }),
    __metadata("design:type", String)
], CrearTransaccionDto.prototype, "acceptanceToken", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El correo electrónico es obligatorio' }),
    __metadata("design:type", String)
], CrearTransaccionDto.prototype, "customerEmail", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PaymentMethodDto),
    __metadata("design:type", PaymentMethodDto)
], CrearTransaccionDto.prototype, "payment_method", void 0);
//# sourceMappingURL=create-transaction.dto.js.map