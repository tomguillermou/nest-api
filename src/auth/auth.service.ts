import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

import { User, UserService } from 'src/users';
import { UserNotFound } from './errors';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService) {}

    public async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.getByCredentials(email, password);

        if (!user) {
            throw new UserNotFound();
        }
        return user;
    }

    public validatePayload(payload: unknown): Promise<User | null> {
        if (typeof payload === 'string' && Types.ObjectId.isValid(payload)) {
            return this.userService.getById(Types.ObjectId(payload));
        }
        return null;
    }

    public getAccessToken(user: User): { access_token: string } {
        return {
            access_token: this.jwtService.sign(user.email),
        };
    }
}
