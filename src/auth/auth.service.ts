import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { User } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';

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

  public async loginUser(credentials: UserCredentials): Promise<User | null> {
    const user = await this.usersService.getByEmail(credentials.email);

    if (user && compareSync(credentials.password, user.password)) {
      delete user.password;
      return user;
    }

    return null;
  }

  public signUserToken(user: User): string {
    return this.jwtService.sign(user.email);
  }
}
