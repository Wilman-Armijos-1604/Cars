import {
  Res,
  Controller,
  Get,
  Post,
  Query,
  Body,
  InternalServerErrorException, Param
} from "@nestjs/common";
import { autoService } from "./auto.service";
import { autoCrearDto } from "../DTO/auto.crear.dto";
import { validate } from "class-validator";
import { autoEditarDto } from "../DTO/auto.editar.dto";


@Controller()
export class autoController {

  constructor(
    private autoService: autoService
  ) {
  }

  @Get("autos/lista")
  async listaAutos(
    @Res() response,
    @Query() params
  ) {
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
        }
      );
    } catch (error) {
      throw new InternalServerErrorException("Error del servidor");
    }
  }


  @Post("autos/eliminar/:idAutos")
  async eliminarUsuario(
    @Res() response,
    @Param() param
  ) {
    try {
      await this.autoService.eliminarUno(
        +param.idAutos
      );
      response.redirect("/autos/lista" + "?mensaje=Se elimino el auto");
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Error eliminando auto");
    }
  }


  @Get("/autos/crear")
  crearAuto(
    @Res() response,
    @Query() params
  ) {
    response.render("auto/crear", { datos: { mensaje: params.mensaje } });
  }


  @Post("/autos/actualizar/:idAuto")
  async actualizarAuto(
    @Res() response,
    @Param() params
  ) {
    try {
      const autoRes = await this.autoService.buscarUno(+params.idAuto);
      response.render("auto/actualizar", {
        datos: {
          auto: autoRes
        }
      });
    } catch (error) {
      throw new InternalServerErrorException("Error del servidor");
    }
  }


  @Post("autos/formCrearAuto")
  async crsearAutoFormulario(
    @Res() response,
    @Body() params
  ) {
    const auto = new autoCrearDto();
    auto.marca = params.marca;
    auto.nombre = params.nombre;
    auto.conPlaca = !!(params.conPlaca);
    auto.precio = parseFloat(params.precio);
    auto.cantidadStock = +params.cantidadStock;
    auto.fechaIngreso = new Date(params.fechaIngreso);
    try {
      const errores = await validate(auto);
      if (errores.length>0) {
        console.log(JSON.stringify(errores))
        throw new InternalServerErrorException("El auto no es valido");
      } else {
        await this.autoService.crearUno(auto);
        response.redirect("/autos/lista" + "?mensaje=Se creo el auto " + params.nombre);
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Error creando el auto");
    }
  }


  @Post("autos/formActualizarAuto/:idAuto")
  async actualizarAutoFormulario(
    @Res() response,
    @Body() bodyParams,
    @Param() routeParams
  ) {
    const auto = new autoEditarDto();
    auto.id = +routeParams.idAuto;
    auto.marca = bodyParams.marca;
    auto.nombre = bodyParams.nombre;
    auto.conPlaca = !!(bodyParams.conPlaca);
    auto.precio = parseFloat(bodyParams.precio);
    auto.cantidadStock = +bodyParams.cantidadStock;
    auto.fechaIngreso = new Date(bodyParams.fechaIngreso);
    try {
      const errores = await validate(auto);
      if (errores.length>0) {
        console.log(JSON.stringify(errores))
        throw new InternalServerErrorException("El auto no es valido");
      } else {
        await this.autoService.actualizarUno({id: auto.id, data: auto});
        response.redirect("/autos/lista" + "?mensaje=Se actualizó el auto " + bodyParams.nombre);
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Error actualizando el auto");
    }
  }


}

