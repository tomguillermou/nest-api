import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common"

import { AuthService } from "./auth.service"
import { CredentialsDto } from "./dtos/credentials.dto"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() credentials: CredentialsDto): Promise<string> {
    try {
      const token = await this.authService.verifyCredentials(credentials)

      return token
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}
