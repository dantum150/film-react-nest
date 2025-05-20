import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Film } from "./film.entity";

@Entity({name:'shedules'})
export class Schedule {

    @PrimaryGeneratedColumn()
    id:number;

  @Column({nullable: false})
  daytime: Date;

  @Column({nullable: false})
  hall: number;

  @Column({nullable: false})
  rows: number;

  @Column({nullable: false})
  seats: number;

  @Column({nullable: false})
  price: number;

  @Column('text', {array: true})
  taken: string[];  // ['4:6', '1:2']
  

  // Для таблицы с декоратором ManyToOne:
  // 1. filmId (декорировать @Column)
  // 2. film (декорировать @ManyToOne)
  @ManyToOne(()=>Film, (film)=>film.schedules)
  @JoinColumn()
  film: Film;

  @Column()
  filmId:number
}

// axios.patch('/films', {filmId})
// FILM                                                                                                                                              // Schedule
// {id:1, title: 'сон в летний день', shedules: [{id: 2, date: '10:00'}, {id: 2, date: '12:00'}, {id: 2, date: '14:00'}] }                           {id: 2, date: '10:00', film: {id:1, title: 'сон в летний день'}}