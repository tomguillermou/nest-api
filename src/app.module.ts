import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth';
import { HealthModule } from 'src/health';
import { UserModule } from 'src/users';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): MongooseModuleOptions => ({
                uri: configService.get<string>('MONGODB_URI'),
            }),
        }),
        AuthModule,
        HealthModule,
        UserModule,
    ],
})
export class AppModule {}
