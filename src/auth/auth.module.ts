import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt"

import { EncryptionModule } from "../encryption"
import { UserModule } from "../user"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

@Module({
  imports: [
    EncryptionModule,
    UserModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        secret: configService.getOrThrow<string>("JWT_SECRET"),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
