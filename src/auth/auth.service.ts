import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { EncryptionService } from "../encryption"
import { UserRepository } from "../user"
import { LoginDto } from "./dtos/login.dto"
import { RegisterDto } from "./dtos/register.dto"

@Injectable()
export class AuthService {
  constructor(
    private _userRepository: UserRepository,
    private _encryptionService: EncryptionService,
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
    const user = await this._userRepository.getByEmail(params.email)
    const isValidPassword = this._encryptionService.compare(params.password, user.password)

    if (!isValidPassword) {
      throw new Error("Invalid credentials")
    }

    return this._jwtService.sign(user.id.toString())
  }

  async register(params: RegisterDto): Promise<string> {
    const hashedPassword = this._encryptionService.hash(params.password)

    const newUser = await this._userRepository.createOne({
      email: params.email,
      password: hashedPassword,
    })

    return this._jwtService.sign(newUser.id.toString())
  }
}
