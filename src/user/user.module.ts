import { Module } from "@nestjs/common"

import { DatabaseModule } from "../database"
import { UserRepository } from "./user.repository"

@Module({
  imports: [DatabaseModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
