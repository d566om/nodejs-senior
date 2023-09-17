import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomerInput, GetCustomerInput, UpdateCustomerInput } from './dto/customer.input';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}
  async findAll(params: GetCustomerInput) {
    const { skip, take, cursor, where } = params;

    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }

  async createCustomer(data: CreateCustomerInput) {
    return this.prisma.customer.create({
      data,
    })
  }

  async findCustomerByEmail(email: string) {
    return this.prisma.customer.findUnique({
      where: { email },
    });
  }
  
  async findCustomerById(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }

  async updateCustomer(id: string, data: UpdateCustomerInput) {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async deleteCustomer(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
