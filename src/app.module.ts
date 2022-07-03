import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth';
import { HealthModule } from 'src/health';
import { UserModule } from 'src/users';

import { AppController } from './app.controller';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): MongooseModuleOptions => ({
                uri: configService.get<string>('MONGODB_URI'),
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }),
        }),
        AuthModule,
        HealthModule,
        UserModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
