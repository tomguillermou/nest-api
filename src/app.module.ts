import { AuthModule } from "src/auth"
import { UserModule } from "src/users"

import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose"

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MongooseModuleOptions => ({
        uri: configService.getOrThrow<string>("MONGODB_URI"),
      }),
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
