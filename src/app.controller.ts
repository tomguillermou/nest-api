import { Controller, Get, UseGuards, Req } from '@nestjs/common';

import { JwtAuthGuard, RequestWithUser } from 'src/auth';
import { User } from 'src/users';

@Controller()
export class AppController {
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req: RequestWithUser): User {
        return req.user;
    }
}
