import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

import { User, UserService } from 'src/users';

type UserCredentials = Pick<User, 'email' | 'password'>;

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService) {}

    public validateUser({ email, password }: UserCredentials): Promise<User | null> {
        return this.userService.getByCredentials(email, password);
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
