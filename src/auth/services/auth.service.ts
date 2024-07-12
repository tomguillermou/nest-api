import { Injectable } from "@nestjs/common"

import { UserRepository } from "../../user"
import { LoginDto } from "../dtos/login.dto"
import { RegisterDto } from "../dtos/register.dto"
import { Token } from "../types/token"
import { EncryptionService } from "./encryption.service"
import { TokenService } from "./token.service"

@Injectable()
export class AuthService {
  constructor(
    private _userRepository: UserRepository,
    private _encryptionService: EncryptionService,
    private _tokenService: TokenService
  ) {}

  async login(params: LoginDto): Promise<Token> {
    const user = await this._userRepository.getByEmail(params.email)
    const isValidPassword = this._encryptionService.compare(params.password, user.password)

    if (!isValidPassword) {
      throw new Error("Invalid credentials")
    }

    return this._tokenService.sign(user.id)
  }

  async register(params: RegisterDto): Promise<Token> {
    const hashedPassword = this._encryptionService.hash(params.password)

    const newUser = await this._userRepository.createOne({
      email: params.email,
      password: hashedPassword,
    })

    return this._tokenService.sign(newUser.id)
  }
}
