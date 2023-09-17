import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UserInput {
  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  password: string;
}
