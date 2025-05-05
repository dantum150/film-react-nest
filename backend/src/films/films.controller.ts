import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { FilmService } from "./films.service";


@Controller('films/')
export class FilmController {

    constructor(private serviceFilm: FilmService){}

    @Get()
    getAll(){
        return this.serviceFilm.getAll()
    }

    // /api/afisha/:id/schedule
    @Get(':id/schedule')
    getOne(@Param('id') id:string){
        return this.serviceFilm.getOne(+id)
    }

    @Post()
    create(@Body() body){
        return this.serviceFilm.create(body)
    }

}