import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from './users.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {
        const userModelMock = function (dto: any) {
            this.data = dto;
            this.save = () => this.data;
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getModelToken(User.name),
                    useValue: userModelMock,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
