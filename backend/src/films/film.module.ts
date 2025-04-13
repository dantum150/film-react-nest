import { Module } from "@nestjs/common";
import { FilmController } from "./films.controller";
import { FilmService } from "./films.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Films, FilmsSchema } from "src/repository/films.schema";
import { FilmRepository } from "src/repository/film.repository";


@Module({
    imports: [MongooseModule.forFeature([{ name: Films.name, schema: FilmsSchema }])],
    controllers:[FilmController],
    providers:[FilmService,FilmRepository ]
})
export class FilmModule {}