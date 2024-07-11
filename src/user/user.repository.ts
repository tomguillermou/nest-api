import { Injectable } from "@nestjs/common"

import { DatabaseService } from "../database"
import { User } from "./user.model"

@Injectable()
export class UserRepository {
  constructor(private _dbService: DatabaseService) {}

  createOne(user: Omit<User, "id">): Promise<User> {
    return this._dbService.user.create({
      data: {
        email: user.email,
        password: user.password,
      },
    })
  }

  getByEmail(email: User["email"]): Promise<User> {
    return this._dbService.user.findUniqueOrThrow({ where: { email } })
  }
}
