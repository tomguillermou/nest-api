import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { User } from "./user.interface"
import { UserDocument } from "./user.model"

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  public createOne(user: User): Promise<User> {
    return this.model.create(user)
  }

  public getById(id: string): Promise<User | null> {
    return this.model.findById(id).lean().exec()
  }

  public getByCredentials(params: { email: string; password: string }): Promise<User | null> {
    const { email, password } = params

    return this.model.findOne({ email, password }).lean().exec()
  }
}
