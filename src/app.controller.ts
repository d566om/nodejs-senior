import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //TODO move this to customer module
  @Get(':verifyEmail')
  verifyCustomerEmail(@Query('verification_token') verificationToken: string) {
    return this.appService.verifyCustomerEmail(verificationToken);
  }
}
