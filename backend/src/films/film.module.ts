import { Module } from "@nestjs/common";
import { FilmController } from "./films.controller";
import { FilmService } from "./films.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Films, FilmsSchema } from "src/repository/films.schema";


@Module({
    imports: [MongooseModule.forFeature([{ name: Films.name, schema: FilmsSchema }])],
    controllers:[FilmController],
    providers:[FilmService]
})
export class FilmModule {}