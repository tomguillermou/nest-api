import { Document, Types } from "mongoose"

import { SchemaFactory } from "@nestjs/mongoose"

import { User } from "./user.interface"

export const UserSchema = SchemaFactory.createForClass(User)

export type UserDocument = User & Document<Types.ObjectId>
