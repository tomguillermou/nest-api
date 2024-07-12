import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { User } from "../../user"
import { Token } from "../types/token"

@Injectable()
export class TokenService {
  constructor(private _jwtService: JwtService) {}

  sign(userId: User["id"]): Token {
    return this._jwtService.sign(userId.toString())
  }

  verify(token: Token): User["id"] {
    const payload = this._jwtService.verify(token)

    if (typeof payload !== "string") {
      throw new Error("Invalid payload format")
    }

    const parsedPayload = Number.parseInt(payload, 10)

    if (Number.isNaN(parsedPayload)) {
      throw new Error("Error parsing payload")
    }

    return parsedPayload
  }
}
