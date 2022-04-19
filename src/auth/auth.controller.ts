import { Controller, Req, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './guards';
import { RequestWithUser } from './interfaces';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: RequestWithUser): { access_token: string } {
        return this.authService.getAccessToken(req.user);
    }
}
