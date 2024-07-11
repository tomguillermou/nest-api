import bcrypt from "bcrypt"

import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class EncryptionService {
  private _saltRounds = this._configService.getOrThrow<string>("SALT_ROUNDS")

  constructor(private _configService: ConfigService) {}

  hash(payload: string): string {
    return bcrypt.hashSync(payload, parseInt(this._saltRounds, 10))
  }

  compare(payload: string, hashed: string): boolean {
    return bcrypt.compareSync(payload, hashed)
  }
}
