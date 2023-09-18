import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshGuard } from './auth.guard';
import { UserInput } from './dto/auth.input';
import { RequestModel } from './refresh.request.model';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    /*
      {
        "email": "newcustomer3@example.com",
        "password": "superpassword"
      }
    */
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() userInfo:UserInput) {
      return this.authService.signIn(userInfo);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signUp')
    signUp(@Body() userInfo:UserInput) {
      return this.authService.signUp(userInfo);
    }

    
    @UseGuards(RefreshGuard)
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    refreshToken(@Req() request: RequestModel) {
      return this.authService.refreshToken(request.user.user);
    }
  }