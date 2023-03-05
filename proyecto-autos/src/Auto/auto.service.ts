import {Injectable} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma } from '@prisma/client';

@Injectable()
export class autoService{

  constructor(
    private prisma: PrismaService
  ) {
  }

  buscarUno(id: number) {
    return this.prisma.auto.findUnique( { where: { id: id, } } )
  }

  crearUno(auto: Prisma.AutoCreateInput) {
    return this.prisma.auto.create( { data: auto, } )
  }

  actualizarUno(parametros:{id: number, data: Prisma.AutoUpdateInput}){
    return this.prisma.auto.update( { data: parametros.data, where: {id: parametros.id}, } )
  }

  eliminarUno(id: number){
    return this.prisma.auto.delete( {where: {id: id}, } )
  }

  buscarMuchos(parametrosBusqueda: {
    skip?: number;
    take?: number;
    busqueda?: string;
  }) {
    const or = parametrosBusqueda.busqueda
      ? { OR: [ { marca: { contains: parametrosBusqueda.busqueda } },
          { nombre: { contains: parametrosBusqueda.busqueda } }, ]
      } : {};
    return this.prisma.auto.findMany({
      where: or,
      take: Number(parametrosBusqueda.take) || undefined,
      skip: Number(parametrosBusqueda.skip) || undefined,
    }); }

}