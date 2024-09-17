"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const productos_controller_1 = require("./productos.controller");
const productos_service_1 = require("./productos.service");
const producto_entity_1 = require("./entities/producto.entity");
const transacciones_controller_1 = require("./transacciones.controller");
const transacciones_service_1 = require("./transacciones.service");
const transaccion_entity_1 = require("./entities/transaccion.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'lp_user',
                password: 'root',
                database: 'lp_test',
                entities: [producto_entity_1.Producto, transaccion_entity_1.Transaccion],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([producto_entity_1.Producto, transaccion_entity_1.Transaccion]),
        ],
        controllers: [productos_controller_1.ProductosController, transacciones_controller_1.TransaccionesController],
        providers: [productos_service_1.ProductosService, transacciones_service_1.TransaccionesService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map