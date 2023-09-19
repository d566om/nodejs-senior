import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class UserInput {
  @IsEmail()
  @Field(() => String, { nullable: true })
  email: string;

  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  password: string;
}
