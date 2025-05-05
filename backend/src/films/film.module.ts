import { Module } from "@nestjs/common";
import { FilmController } from "./films.controller";
import { FilmService } from "./films.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Films, FilmsSchema } from "src/repository/films.schema";
import { FilmRepository } from "src/repository/film.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Film } from "./entity/film.entity";
import { Schedule } from "./entity/shedule.entities";


@Module({
    imports: [TypeOrmModule.forFeature([Film, Schedule])],
    controllers:[FilmController],
    providers:[FilmService,FilmRepository ]
})
export class FilmModule {}