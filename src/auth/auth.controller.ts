import { Controller, Request, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): { jwt: string } {
        return { jwt: this.authService.signUserToken(req.user) };
    }
}
