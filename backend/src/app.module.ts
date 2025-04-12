import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {ConfigModule} from "@nestjs/config";
import * as path from "node:path";
import { FilmModule } from './films/film.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import {configProvider} from "./app.config.provider";

@Module({
  imports: [
  MongooseModule.forRoot('mongodb://localhost/films'),
	ConfigModule.forRoot({
          isGlobal: true,
          cache: true
      }),
  FilmModule,
  OrderModule,
      // @todo: Добавьте раздачу статических файлов из public
  ],
  controllers: [],
  // массив классов с @Injecatble
  providers: [configProvider],
})
export class AppModule {}
