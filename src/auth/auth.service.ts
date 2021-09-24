import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { User, UsersService } from '@users';

export type UserCredentials = {
    email: string;
    password: string;
};

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    public async loginUser({ email, password }: UserCredentials): Promise<User | null> {
        const user = await this.usersService.getByEmail(email);

        if (user && compareSync(user.password, password)) {
            delete user.password;
            return user;
        }

        return null;
    }

    public signUserToken(user: User): string {
        return this.jwtService.sign(user.email);
    }
}
