import { Injectable, HttpException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "src/repository/order.schema";
import { Model } from "mongoose";
import { FilmModule } from "src/films/film.module";
import { Films } from "src/repository/films.schema";
import { OrderRepository } from "src/repository/order.repository";


// controller => service => repository => mongoose
@Injectable()
export class OrderService {

    constructor(
        private repository:OrderRepository
    ){}

    create(body){
        return this.repository.createOrders(body)
    }
  
}