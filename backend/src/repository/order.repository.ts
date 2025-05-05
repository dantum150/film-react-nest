import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Schedule } from "src/films/entity/shedule.entities";
import { Film } from "src/films/entity/film.entity";
import { Repository } from "typeorm";

interface IBody {
    tickets: ITicket []
}

interface ITicket {
    day: string
    daytime: string
    film: number
    price: number
    row: number
    seat: number
    session: number
    time: string
} 


// controller => service => repository => mongoose
@Injectable()
export class OrderRepository {

    constructor(
        @InjectRepository(Schedule) private scheduleModel: Repository<Schedule>, 
        @InjectRepository(Film) private filmModel: Repository<Film> 
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
        const film = await this.filmModel.findOne({where:{id: ticket.film}})

        const schedule = film.schedules.find((scheduleItem)=> scheduleItem.id === ticket.session)
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
 

        await this.filmModel.update({id:  ticket.film}, film)

        return order
    }
}