import { Injectable } from "@nestjs/common";
import { Films } from "src/repository/films.schema";
import { FilmRepository } from "src/repository/film.repository";


@Injectable()
export class FilmService {

    constructor(
       private repository:FilmRepository
    ){}

    async getAll(){
        return this.repository.getAll()
    }
        
   async getOne(id:number){
        return this.repository.getOne(id)
    }

    create(body){
        return this.repository.create(body)
    }
}