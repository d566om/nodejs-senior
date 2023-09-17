import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CreateCustomerInput, GetCustomerInput, UpdateCustomerInput} from './dto/customer.input';
import { Customer } from '../lib/entities/customer.entity';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async customers(@Args('data') { skip, take, where }: GetCustomerInput) {
    return this.customerService.findAll({ skip, take, where });
  }

  @Mutation(() => Customer)
  async createCustomer(@Args('data') data: CreateCustomerInput) {
    return this.customerService.createCustomer(data);
  }

  @Query(() => Customer)
  async customerByEmail(@Args('email') email: string) {
    return this.customerService.findCustomerByEmail(email);
  }

  @Query(() => Customer)
  async customerById(@Args('id') id: string) {
    return this.customerService.findCustomerById(id);
  }

  @Mutation(() => Customer)
  async updateCustomer(
    @Args('id') id: string,
    @Args('data') data: UpdateCustomerInput
  ) {
    return this.customerService.updateCustomer(id, data);
  }

  @Mutation(() => Customer)
  async deleteCustomer(@Args('id') id: string) {
    return this.customerService.deleteCustomer(id);
  }
}
