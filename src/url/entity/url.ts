import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Url extends Document {
  @Prop()
  url: string;

  @Prop()
  shortenedUrl: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
