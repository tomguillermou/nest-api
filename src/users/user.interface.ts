import { Types } from "mongoose"

import { Prop, Schema } from "@nestjs/mongoose"

@Schema()
export class User {
  _id!: Types.ObjectId

  @Prop({ required: true })
  email!: string

  @Prop({ required: true, select: false })
  password!: string

  @Prop({ required: true })
  firstname!: string

  @Prop({ required: true })
  lastname!: string

  @Prop({ required: true })
  isAdmin!: boolean
}
