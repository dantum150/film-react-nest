import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Films } from "src/repository/films.schema";
import { Model } from "mongoose";


@Injectable()
export class FilmService {

    constructor(@InjectModel(Films.name) private filmModel: Model<Films> ){}

    getAll(){
        return this.filmModel.find()
    }
        
    getOne(id:string){
        return this.filmModel.findById(id)
    }

    create(body){
        return this.filmModel.create(body)
    }
}