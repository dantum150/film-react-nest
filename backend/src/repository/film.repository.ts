import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Films } from "src/repository/films.schema";
import { Model } from "mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import { Film } from "src/films/entity/film.entity";
import { Repository } from "typeorm";


@Injectable()
export class FilmRepository {

    constructor(@InjectRepository(Film) private filmModel: Repository<Film> ){}

    async getAll(){
        const allFilms = await this.filmModel.find();
        
        return {
           items: allFilms 
        }
    }
        
   async getOne(id:number){  // 5
        // where - всегда объект, ключи - это название колонок
        const OneFilm = await this.filmModel.findOne({where:{id}}) //select * from film where filmid = 5
        return {
            items: OneFilm.schedules
        }  
    }

    create(body){ // {title, price, tags,}
        // 1. вызываем create() и кладём в константу;
        // 2. вызываем save() и передаём в неё контанту
     const createRow =  this.filmModel.create(body)
     return this.filmModel.save(createRow)
    }
}