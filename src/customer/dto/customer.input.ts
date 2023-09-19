import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsEmail } from 'class-validator';

@InputType()
export class WhereCustomerInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@InputType()
export class GetCustomerInput {
  @Field(() => String, { nullable: true })
  cursor?: Prisma.CustomerWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  skip: number;

  @Field(() => Int, { nullable: true })
  take: number;

  @Field(() => WhereCustomerInput, { nullable: true })
  where: WhereCustomerInput;
}

@InputType()
export class CreateCustomerInput {
  @Field() // You can add validation decorators here, e.g., @IsEmail()
  email: string;

  @Field()
  description: string;

  // Ideally we should store it has salted hash, for now it'll be plaintext
  @Field()
  password: string

  // You can add more fields as needed for creating a customer
}

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  // Here, you can mark fields as optional that can be updated
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  description?: string;

  // Add more fields as needed for updating a customer
}
