import { Injectable, HttpException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order } from "src/repository/order.schema";
import { Model } from "mongoose";
import { FilmModule } from "src/films/film.module";
import { Films } from "src/repository/films.schema";


interface IBody {
    tickets: {
        day: string
        daytime: string
        film: string
        price: number
        row: number
        seat: number
        session: string
        time: string
    } []
}

interface ITicket {
    day: string
    daytime: string
    film: string
    price: number
    row: number
    seat: number
    session: string
    time: string
} 


// controller => service => repository => mongoose
@Injectable()
export class OrderRepository {

    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>, 
        @InjectModel(Films.name) private filmModel: Model<Films> 
    ){}

    // 1. Найти фильм по id
    // 2. Найти сеанс по id
    // 3. 
    async createOrders(body:IBody){       // email, phone, tickets  {}   

        const orders = []
      
        for(let i=0; i<body.tickets.length; i++){
           const order = await this.createOrder(body.tickets[i])
           orders.push(order)
        }

        return {
            items: orders
        }
        
    }

    async createOrder(ticket: ITicket) {    // создать заказ в БД || выкинуть ошибку, что место занято
        const film = await this.filmModel.findOne({id: ticket.film})
        const schedule = film.schedule.find((scheduleItem)=> scheduleItem.id === ticket.session)
        const seat = `${ticket.row}:${ticket.seat}`;    // '2:3'

        const hasBooking = schedule.taken.includes(seat)

        if (hasBooking) {
            throw new HttpException('Такое место уже куплен', 403) // {message, code: 403}
        }
         
        schedule.taken.push(seat)

        const order = {
                film: ticket.film,
                session:ticket.session,
                seat
        }

        await this.orderModel.create(order)  // {_id, }

        await this.filmModel.updateOne({id: ticket.film}, {
            $set: {
                schedule: film.schedule
            }
        })

        return order
    }
}