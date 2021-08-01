import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return existing user', async () => {
    const user = await service.getByEmail('test@mail.com');

    expect(user).toEqual({
      email: 'test@mail.com',
      password: 'test',
    });
  });

  it('should return undefined if user does not exists', async () => {
    const user = await service.getByEmail('not_exisiting_email@mail.com');

    expect(typeof user).toBe('undefined');
  });
});
