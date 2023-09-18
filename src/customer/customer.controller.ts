// customer.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerInput, GetCustomerInput, UpdateCustomerInput } from './dto/customer.input';
import { AuthGuard, RoleGuard } from 'src/authentication/auth.guard';
import { Roles } from 'src/authentication/auth.roles';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // GET localhost:8080/customers
  @UseGuards(AuthGuard)
  @Get()
  getAllCustomers(@Query() query: GetCustomerInput) {
    return this.customerService.findAll(query);
  }

  // GET localhost:8080/customers/9e391faf-64b2-4d4c-b879-463532920fd3
  @UseGuards(AuthGuard)
  @Get(':id')
  getCustomerById(@Param('id') id: string) {
    return this.customerService.findCustomerById(id);
  }

  /* 
    POST localhost:8080/customers/
    (raw json body)
    {
      "email": "newcustomer@example.com",
      "password": "super secret password"
    }
  */
  @UseGuards(AuthGuard)
  @Post()
  createCustomer(@Body() createCustomerInput: CreateCustomerInput) {
    return this.customerService.createCustomer(createCustomerInput);
  }

  /*
    PUT localhost:8080/customers/dbbd2d65-cf04-4dc5-aa67-1f49d7963f7a

    {
      "email": "newcustomer2@example.com"
    }
  */
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RoleGuard)
  @Put(':id')
  updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerInput: UpdateCustomerInput,
  ) {
    return this.customerService.updateCustomer(id, updateCustomerInput);
  }

  /*
    DELETE localhost:8080/customers/dbbd2d65-cf04-4dc5-aa67-1f49d7963f7a
   */
  @Roles('ADMIN')
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  deleteCustomer(@Param('id') id: string) {
    return this.customerService.deleteCustomer(id);
  }
}
