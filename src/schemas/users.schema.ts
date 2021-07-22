import { ColorSchemeEnum } from '../components/users/interfaces/user.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const validator = require("email-validator");


export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
    trim: true,
    index: true,
  })
  first_name: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    index: true,
  })
  last_name: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    index: true,
  })
  password: string;
}


export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(aggregatePaginate);
export const UserSchemaName = "users";
