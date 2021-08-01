import { Injectable } from '@nestjs/common';

import { User, UsersService } from 'src/users/users.service';

export type UserCredentials = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async loginUser(
    userCredentials: UserCredentials,
  ): Promise<User | null> {
    const user = await this.usersService.getByEmail(userCredentials.email);

    if (user && user.password === userCredentials.password) {
      delete user.password;

      return user;
    }

    return null;
  }
}
