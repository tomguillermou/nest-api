import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User {
    _id!: Types.ObjectId;

    @Prop({ required: true })
    email!: string;

    @Prop({ required: true, select: false })
    password!: string;

    @Prop({ required: true })
    firstname!: string;

    @Prop({ required: true })
    lastname!: string;

    @Prop({ required: true })
    isAdmin!: boolean;
}

export type UserDocument = User & Document<Types.ObjectId>;

export const UserSchema = SchemaFactory.createForClass(User);
