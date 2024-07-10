import { Controller, Get, NotFoundException, Req, UseGuards } from "@nestjs/common"
import { AuthGuard, AuthRequest } from "../auth"
import { User } from "./user.interface"
import { UserService } from "./user.service"

@Controller("users")
export class UserController {
  constructor(private _userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get("profile")
  async getProfile(@Req() req: AuthRequest): Promise<User> {
    const user = await this._userService.getById(req.userId)

    if (!user) {
      throw new NotFoundException()
    }

    return user
  }
}
