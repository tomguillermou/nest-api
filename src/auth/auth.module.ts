import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt"

import { UserModule } from "../user"
import { AuthController } from "./auth.controller"
import { AuthService } from "./services/auth.service"
import { EncryptionService } from "./services/encryption.service"
import { TokenService } from "./services/token.service"

@Module({
  imports: [
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
  providers: [AuthService, EncryptionService, TokenService],
})
export class AuthModule {}
