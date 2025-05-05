import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderRepository } from "src/repository/order.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Film } from "src/films/entity/film.entity";
import { Schedule } from "src/films/entity/shedule.entities";

@Module({
    imports: [TypeOrmModule.forFeature([Film, Schedule])],
    controllers:[OrderController],
    providers:[OrderService,OrderRepository]
})

export class OrderModule{}