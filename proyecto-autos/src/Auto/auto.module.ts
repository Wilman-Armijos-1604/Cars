import { Module } from '@nestjs/common'
import { PrismaService } from "../prisma.service";
import { autoService } from "./auto.service";
import { autoController } from "./auto.controller";


@Module(
  {
    imports: [

    ],
    providers: [
        autoService,
        PrismaService
    ],
    exports: [
        autoService
    ],
    controllers: [
        autoController
    ]
  }
)

export class autoModule{

}