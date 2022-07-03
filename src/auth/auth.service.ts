import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

import { User, UserService } from 'src/users';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService) {}

    public async getUserFromCredentials(email: string, password: string): Promise<User> {
        const user = await this.userService.getByCredentials(email, password);

        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    public async getUserFromJwtPayload(payload: unknown): Promise<User> {
        if (!(typeof payload === 'string') || !Types.ObjectId.isValid(payload)) {
            throw new Error('Invalid payload');
        }

        const userId = new Types.ObjectId(payload);
        const user = await this.userService.getById(userId);

        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    public getAccessToken(user: User): { access_token: string } {
        return {
            access_token: this.jwtService.sign(user._id.toString()),
        };
    }
}
