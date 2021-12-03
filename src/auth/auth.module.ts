import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { UsersModule } from 'src/users';

import { JwtStrategy, LocalStrategy } from './strategies';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): JwtModuleOptions => ({
                secret: configService.get<string>('JWT_SECRET'),
            }),
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
