import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { UserController } from "./user.controller"
import { User } from "./user.interface"
import { UserSchema } from "./user.model"
import { UserService } from "./user.service"

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
