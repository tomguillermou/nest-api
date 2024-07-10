import { JwtService } from "@nestjs/jwt"

import { UserService } from "../users"
import { CredentialsDto } from "./dtos/credentials.dto"

export class AuthService {
  constructor(private _jwtService: JwtService, private _userService: UserService) {}

  verifyJwt(token: string): string {
    const payload = this._jwtService.verify(token)

    if (typeof payload !== "string") {
      throw new Error("Payload must be a string")
    }
    return payload
  }

  async verifyCredentials(credentials: CredentialsDto): Promise<string> {
    const user = await this._userService.getByCredentials(credentials)

    if (!user) {
      throw new Error("User not found")
    }

    return this._jwtService.sign(user._id.toString())
  }
}
