import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from "./prisma.service";
import { autoService } from "./Auto/auto.service";
import { autoModule } from "./Auto/auto.module";

@Module({
  imports: [
    autoModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    PrismaService
  ],
  exports: [
    AppService
  ]
})
export class AppModule {}
