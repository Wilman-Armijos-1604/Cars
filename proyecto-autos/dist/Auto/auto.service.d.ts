import { PrismaService } from "../prisma.service";
import { Prisma } from '@prisma/client';
export declare class autoService {
    private prisma;
    constructor(prisma: PrismaService);
    buscarUno(id: number): Prisma.Prisma__AutoClient<import(".prisma/client").Auto>;
    crearUno(auto: Prisma.AutoCreateInput): Prisma.Prisma__AutoClient<import(".prisma/client").Auto>;
    actualizarUno(parametros: {
        id: number;
        data: Prisma.AutoUpdateInput;
    }): Prisma.Prisma__AutoClient<import(".prisma/client").Auto>;
    eliminarUno(id: number): Prisma.Prisma__AutoClient<import(".prisma/client").Auto>;
    buscarMuchos(parametrosBusqueda: {
        skip?: number;
        take?: number;
        busqueda?: string;
    }): import(".prisma/client").PrismaPromise<import(".prisma/client").Auto[]>;
}
