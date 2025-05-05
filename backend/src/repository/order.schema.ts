import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Films } from './films.schema'

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  film: string;

  @Prop({ required: true })
  session: string;

  @Prop({ required: true })
  seat: string;   // номер ряда:номер места (3:5)
}

export const OrderSchema = SchemaFactory.createForClass(Order);