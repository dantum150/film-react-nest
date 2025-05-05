import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Films } from "src/repository/films.schema";
import { Model } from "mongoose";
import { FilmRepository } from "src/repository/film.repository";


@Injectable()
export class FilmService {

    constructor(
       private repository:FilmRepository
    ){}

    async getAll(){
        return this.repository.getAll()
    }
        
   async getOne(id:string){
        return this.repository.getOne(id)
    }

    create(body){
        return this.repository.create(body)
    }
}