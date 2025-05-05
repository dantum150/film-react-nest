import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "src/repository/order.schema";
import { Films, FilmsSchema } from "src/repository/films.schema";
import { OrderRepository } from "src/repository/order.repository";

@Module({
    imports: [MongooseModule.forFeature([
        { name: Order.name, schema: OrderSchema },
        { name: Films.name, schema: FilmsSchema }
    ])],
    controllers:[OrderController],
    providers:[OrderService,OrderRepository]
})

export class OrderModule{}