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
exports.autoController = void 0;
const common_1 = require("@nestjs/common");
const auto_service_1 = require("./auto.service");
const auto_crear_dto_1 = require("../DTO/auto.crear.dto");
const class_validator_1 = require("class-validator");
const auto_editar_dto_1 = require("../DTO/auto.editar.dto");
let autoController = class autoController {
    constructor(autoService) {
        this.autoService = autoService;
    }
    async listaAutos(response, params) {
        try {
            const respuesta = await this.autoService
                .buscarMuchos({
                skip: +params.skip ? +params.skip : undefined,
                take: +params.take ? +params.take : undefined,
                busqueda: params.busqueda ? params.busqueda : undefined
            });
            console.log(respuesta);
            response.render("auto/lista", {
                datos: {
                    autos: respuesta,
                    mensaje: params.mensaje
                }
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Error del servidor");
        }
    }
    async eliminarUsuario(response, param) {
        try {
            await this.autoService.eliminarUno(+param.idAutos);
            response.redirect("/autos/lista" + "?mensaje=Se elimino el auto");
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException("Error eliminando auto");
        }
    }
    crearAuto(response, params) {
        response.render("auto/crear", { datos: { mensaje: params.mensaje } });
    }
    async actualizarAuto(response, params) {
        try {
            const autoRes = await this.autoService.buscarUno(+params.idAuto);
            response.render("auto/actualizar", {
                datos: {
                    auto: autoRes
                }
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("Error del servidor");
        }
    }
    async crsearAutoFormulario(response, params) {
        const auto = new auto_crear_dto_1.autoCrearDto();
        auto.marca = params.marca;
        auto.nombre = params.nombre;
        auto.conPlaca = !!(params.conPlaca);
        auto.precio = parseFloat(params.precio);
        auto.cantidadStock = +params.cantidadStock;
        auto.fechaIngreso = new Date(params.fechaIngreso);
        try {
            const errores = await (0, class_validator_1.validate)(auto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.InternalServerErrorException("El auto no es valido");
            }
            else {
                await this.autoService.crearUno(auto);
                response.redirect("/autos/lista" + "?mensaje=Se creo el auto " + params.nombre);
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException("Error creando el auto");
        }
    }
    async actualizarAutoFormulario(response, bodyParams, routeParams) {
        const auto = new auto_editar_dto_1.autoEditarDto();
        auto.id = +routeParams.idAuto;
        auto.marca = bodyParams.marca;
        auto.nombre = bodyParams.nombre;
        auto.conPlaca = !!(bodyParams.conPlaca);
        auto.precio = parseFloat(bodyParams.precio);
        auto.cantidadStock = +bodyParams.cantidadStock;
        auto.fechaIngreso = new Date(bodyParams.fechaIngreso);
        try {
            const errores = await (0, class_validator_1.validate)(auto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.InternalServerErrorException("El auto no es valido");
            }
            else {
                await this.autoService.actualizarUno({ id: auto.id, data: auto });
                response.redirect("/autos/lista" + "?mensaje=Se actualizó el auto " + bodyParams.nombre);
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException("Error actualizando el auto");
        }
    }
};
__decorate([
    (0, common_1.Get)("autos/lista"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], autoController.prototype, "listaAutos", null);
__decorate([
    (0, common_1.Post)("autos/eliminar/:idAutos"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], autoController.prototype, "eliminarUsuario", null);
__decorate([
    (0, common_1.Get)("/autos/crear"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], autoController.prototype, "crearAuto", null);
__decorate([
    (0, common_1.Post)("/autos/actualizar/:idAuto"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], autoController.prototype, "actualizarAuto", null);
__decorate([
    (0, common_1.Post)("autos/formCrearAuto"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], autoController.prototype, "crsearAutoFormulario", null);
__decorate([
    (0, common_1.Post)("autos/formActualizarAuto/:idAuto"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], autoController.prototype, "actualizarAutoFormulario", null);
autoController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auto_service_1.autoService])
], autoController);
exports.autoController = autoController;
//# sourceMappingURL=auto.controller.js.map