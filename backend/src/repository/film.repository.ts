import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Films } from "src/repository/films.schema";
import { Model } from "mongoose";


@Injectable()
export class FilmRepository {

    constructor(@InjectModel(Films.name) private filmModel: Model<Films> ){}

    async getAll(){
        const allFilms = await this.filmModel.find();
        
        return {
           items: allFilms 
        }
    }
        
   async getOne(id:string){
        const OneFilm = await this.filmModel.findOne({id}) 
        return {
            items: OneFilm.schedule
        }  
    }

    create(body){
        return this.filmModel.create(body)
    }
}