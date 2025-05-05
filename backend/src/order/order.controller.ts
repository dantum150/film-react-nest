import { Controller, Post, Body } from "@nestjs/common";
import { OrderService } from "./order.service";


@Controller('/order')
export class OrderController{

    constructor(private OrderService: OrderService){}

    @Post()
    create(@Body() body){
        return this.OrderService.create(body)
    }

}