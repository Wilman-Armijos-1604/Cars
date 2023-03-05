import { autoService } from "./auto.service";
export declare class autoController {
    private autoService;
    constructor(autoService: autoService);
    listaAutos(response: any, params: any): Promise<void>;
    eliminarUsuario(response: any, param: any): Promise<void>;
    crearAuto(response: any, params: any): void;
    actualizarAuto(response: any, params: any): Promise<void>;
    crsearAutoFormulario(response: any, params: any): Promise<void>;
    actualizarAutoFormulario(response: any, bodyParams: any, routeParams: any): Promise<void>;
}
