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
exports.TransaccionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaccion_entity_1 = require("./entities/transaccion.entity");
const producto_entity_1 = require("./entities/producto.entity");
const crypto = require("crypto");
const axios_1 = require("axios");
let TransaccionesService = class TransaccionesService {
    constructor(transaccionesRepository, productosRepository) {
        this.transaccionesRepository = transaccionesRepository;
        this.productosRepository = productosRepository;
    }
    async getProducto(productoId) {
        const producto = await this.productosRepository.findOne({ where: { id: productoId } });
        if (!producto) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        return producto;
    }
    async crearFuenteDePago(token, customerEmail, acceptanceToken) {
        try {
            const response = await axios_1.default.post('https://api-sandbox.co.uat.wompi.dev/v1/payment_sources', {
                type: 'CARD',
                token: token,
                customer_email: customerEmail,
                acceptance_token: acceptanceToken,
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Fuente de pago creada:', response.data);
            return response.data.data.id;
        }
        catch (error) {
            console.error('Error al crear la fuente de pago:', error.response ? error.response.data : error.message);
            throw new common_1.BadRequestException(`Error al crear la fuente de pago: ${error.response ? error.response.data : error.message}`);
        }
    }
    async crearTransaccion(producto, monto, cardHolder, token, installments, customerEmail) {
        if (producto.stock <= 0) {
            throw new common_1.BadRequestException('Stock insuficiente para realizar la transacción');
        }
        const transaccion = this.transaccionesRepository.create({
            estado: transaccion_entity_1.EstadoTransaccion.PENDIENTE,
            monto,
            producto,
        });
        const savedTransaccion = await this.transaccionesRepository.save(transaccion);
        const acceptanceToken = await this.obtenerAcceptanceToken();
        const paymentSourceId = await this.crearFuenteDePago(token, customerEmail, acceptanceToken);
        await this.realizarPagoConWompi(savedTransaccion, paymentSourceId, acceptanceToken, cardHolder, installments, customerEmail);
        return savedTransaccion;
    }
    async obtenerAcceptanceToken() {
        try {
            const response = await axios_1.default.get(`https://api-sandbox.co.uat.wompi.dev/v1/merchants/${process.env.WOMPI_PUBLIC_KEY}`);
            return response.data.data.presigned_acceptance.acceptance_token;
        }
        catch (error) {
            console.error('Error obteniendo el acceptance_token:', error.response ? error.response.data : error.message);
            throw new common_1.BadRequestException('No se pudo obtener el acceptance_token');
        }
    }
    generarFirmaIntegridad(amountInCents, currency, reference, expirationTime, integrityKey) {
        const concatenatedString = `${reference}${amountInCents}${currency}${expirationTime}${integrityKey}`;
        const signature = crypto.createHash('sha256').update(concatenatedString).digest('hex');
        return signature;
    }
    async realizarPagoConWompi(transaccion, paymentSourceId, acceptanceToken, cardHolder, installments, customerEmail) {
        const integrityKey = process.env.WOMPI_INTEGRITY_KEY;
        const reference = `transaccion_${transaccion.id}`;
        const expirationTime = '2024-12-14T23:28:50.000Z';
        const amountInCents = transaccion.monto * 100;
        const signature = this.generarFirmaIntegridad(amountInCents, 'COP', reference, expirationTime, integrityKey);
        const transaccionPayload = {
            amount_in_cents: amountInCents,
            currency: 'COP',
            payment_method: {
                type: 'CARD',
                installments,
            },
            payment_source_id: paymentSourceId,
            reference,
            customer_email: customerEmail,
            acceptance_token: acceptanceToken,
            signature,
            redirect_url: 'https://mitienda.com.co/pago/resultadoppp',
            expiration_time: expirationTime,
            customer_data: {
                phone_number: '573307654321',
                full_name: cardHolder,
                legal_id: '1234567890',
                legal_id_type: 'CC',
            },
            shipping_address: {
                address_line_1: 'Calle 34 # 56 - 78',
                address_line_2: 'Apartamento 502, Torre I',
                country: 'CO',
                region: 'Cundinamarca',
                city: 'Bogotá',
                name: 'Pepe Perez',
                phone_number: '573109999999',
                postal_code: '111111',
            },
        };
        console.log('Payload enviado a Wompi:', transaccionPayload);
        try {
            const response = await axios_1.default.post('https://api-sandbox.co.uat.wompi.dev/v1/transactions', transaccionPayload, {
                headers: {
                    Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('Detalles del error de Wompi:', error.response ? error.response.data : error.message);
            throw new common_1.BadRequestException(`Error en la transacción con Wompi: ${JSON.stringify(error.response ? error.response.data : error.message)}`);
        }
    }
    async completarTransaccion(id, estado) {
        const transaccion = await this.transaccionesRepository.findOne({ where: { id }, relations: ['producto'] });
        if (!transaccion) {
            throw new common_1.NotFoundException('Transacción no encontrada');
        }
        transaccion.estado = estado;
        if (estado === transaccion_entity_1.EstadoTransaccion.COMPLETADO) {
            await this.actualizarStockProducto(transaccion.producto, 1);
        }
        return this.transaccionesRepository.save(transaccion);
    }
    async actualizarStockProducto(producto, cantidadVendida) {
        producto.stock -= cantidadVendida;
        if (producto.stock < 0) {
            throw new common_1.BadRequestException('Stock insuficiente');
        }
        await this.productosRepository.save(producto);
    }
};
exports.TransaccionesService = TransaccionesService;
exports.TransaccionesService = TransaccionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaccion_entity_1.Transaccion)),
    __param(1, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TransaccionesService);
//# sourceMappingURL=transacciones.service.js.map