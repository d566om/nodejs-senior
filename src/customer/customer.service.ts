import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCustomerInput, GetCustomerInput, UpdateCustomerInput } from './dto/customer.input';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/authentication/constants';

@Injectable()
export class CustomerService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}
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
    const customer = await this.prisma.customer.create({data});
    const jwtPayload = {id: customer.id, email: customer.email};

    //TODO the verification token should be sent out in email
    return {
      customer: customer,
      verification_token: await this.jwtService.signAsync(jwtPayload, {
        secret: jwtConstants.verificationTokenSecret,
        expiresIn: jwtConstants.verificationTokenExpiration
      })
    };
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
