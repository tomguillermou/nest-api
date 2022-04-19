import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

    public createOne(user: User): Promise<User> {
        return this.model.create(user);
    }

    public getById(id: Types.ObjectId): Promise<User | null> {
        return this.model.findById(id).lean().exec();
    }

    public getByCredentials(email: string, password: string): Promise<User | null> {
        return this.model.findOne({ email, password }).lean().exec();
    }
}
