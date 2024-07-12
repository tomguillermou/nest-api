import { Controller, Post, Body, UnauthorizedException, Logger } from "@nestjs/common"

import { AuthService } from "./auth.service"
import { LoginDto } from "./dtos/login.dto"
import { RegisterDto } from "./dtos/register.dto"
import { Token } from "./types/token"

@Controller("auth")
export class AuthController {
  private _logger = new Logger(AuthController.name)

  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() credentials: LoginDto): Promise<Token> {
    try {
      return await this.authService.login(credentials)
    } catch (error) {
      this._logger.error(error)
      throw new UnauthorizedException()
    }
  }

  @Post("register")
  async register(@Body() user: RegisterDto): Promise<Token> {
    try {
      return await this.authService.register(user)
    } catch (error) {
      this._logger.error(error)
      throw new UnauthorizedException()
    }
  }
}
