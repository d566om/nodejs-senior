import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserInput } from './dto/auth.input';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
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
  }