import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './authentication/constants';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  async verifyCustomerEmail(verificationToken: string) {
    const payload = await this.jwtService.verifyAsync(
      verificationToken,
      {
        secret: jwtConstants.verificationTokenSecret
      }
    );

    console.log('Verify customer: ' + payload.username);
    //TODO update verified property of customer
  }
}
