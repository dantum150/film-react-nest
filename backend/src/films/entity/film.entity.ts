import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Schedule } from "./shedule.entities";


@Entity({name:'films'})
export class Film {

@PrimaryGeneratedColumn()
id:number

@Column({nullable: false})
  title: string;

  @Column({nullable: false})
  about: string;

  @Column({nullable: false})
  description: string;

  @Column({nullable: false})
  director: string;

  @Column()
  tags: string[];

  @Column({nullable: false})
  rating: number;

  @Column({nullable: false})
  image: string;

  @Column({nullable: false})
  cover: string;

  @OneToMany(()=>Schedule, (shedule)=>shedule)
  schedules: Schedule [] ;

    
}