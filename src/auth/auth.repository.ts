import { Injectable } from "@nestjs/common"

import { DatabaseService } from "../database"
import { Auth } from "./auth.model"

@Injectable()
export class AuthRepository {
  constructor(private _dbService: DatabaseService) {}

  createOne(auth: Omit<Auth, "id">): Promise<Auth> {
    return this._dbService.auth.create({
      data: {
        email: auth.email,
        password: auth.password,
      },
    })
  }

  getByCredentials(params: { email: string; password: string }): Promise<Auth> {
    return this._dbService.auth.findUniqueOrThrow({
      where: {
        email: params.email,
        password: params.password,
      },
    })
  }
}
