// src/schedules/schemas/schedule.schema.ts
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Films } from './films.schema'

@Schema()
export class Schedule extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Films', required: true })
  film: Films;

  @Prop({ required: true })
  daytime: Date;

  @Prop({ required: true })
  hall: number;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [[Number]], default: [] })
  taken: number[][];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);