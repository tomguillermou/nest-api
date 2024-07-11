import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { AuthRepository } from "./auth.repository"
import { LoginDto } from "./dtos/login.dto"
import { RegisterDto } from "./dtos/register.dto"

@Injectable()
export class AuthService {
  constructor(
    private _authRepository: AuthRepository,
    private _jwtService: JwtService
  ) {}

  verifyJwt(token: string): string {
    const payload = this._jwtService.verify(token)

    if (typeof payload !== "string") {
      throw new Error("Payload must be a string")
    }
    return payload
  }

  async login(params: LoginDto): Promise<string> {
    const user = await this._authRepository.getByCredentials(params)

    return this._jwtService.sign(user.id.toString())
  }

  async register(params: RegisterDto): Promise<string> {
    const newUser = await this._authRepository.createOne(params)

    return this._jwtService.sign(newUser.id.toString())
  }
}
