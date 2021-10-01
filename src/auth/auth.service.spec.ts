import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { UsersService } from '@users';

import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;

    const jwtServiceMock: Partial<JwtService> = {};

    const usersServiceMock: Partial<UsersService> = {
        getByEmail: async (email: string) => {
            if (typeof email !== 'string') {
                return null;
            }
            return { email, password: 'test' };
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: JwtService, useValue: jwtServiceMock },
                { provide: UsersService, useValue: usersServiceMock },
                AuthService,
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('loginUser', () => {
        it('should authenticate a user that exists', async () => {
            const email = 'test@mail.com';

            jest.spyOn(bcrypt, 'compareSync').mockReturnValueOnce(true);

            const user = await service.loginUser({ email, password: 'test' });
            expect(user).not.toBeNull();
            expect(user.email).toBe(email);
        });

        it('should not authenticate a user that does not exist', async () => {
            const email = null;
            const user = await service.loginUser({ email, password: 'test' });
            expect(user).toBeNull();
        });
    });
});
