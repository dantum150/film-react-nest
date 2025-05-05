import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {ConfigModule} from "@nestjs/config";
import * as path from "node:path";
import { FilmModule } from './films/film.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';
import {configProvider} from "./app.config.provider";
import { join } from 'path';

@Module({
  imports: [

  // localhost:3000/content/afisha/bg1c.jpg
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
  }),  

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
