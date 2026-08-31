import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type loginDocument = HydratedDocument<Login>;

@Schema()
export class Login {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
  
  @Prop({ required: false })
  remember_me: boolean;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
