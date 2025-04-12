// src/movies/schemas/movie.schema.ts
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Films extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  director: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cover: string;
}

export const FilmsSchema = SchemaFactory.createForClass(Films);