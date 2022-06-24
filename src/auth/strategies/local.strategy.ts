import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { User } from 'src/users';

import { AuthService } from '../auth.service';
import { UserNotFound } from '../errors';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string): Promise<User> {
        try {
            return await this.authService.validateUser(email, password);
        } catch (error) {
            if (error instanceof UserNotFound) {
                throw new UnauthorizedException();
            }
            throw new InternalServerErrorException();
        }
    }
}
