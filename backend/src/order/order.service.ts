import { Injectable } from "@nestjs/common";

@Injectable()
export class OrderService {

    constructor(){}

    create(body){ 
        
        const newBody = {
            ...body,
            id: 1   
        }
        return newBody
    }
}