import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserInput } from './dto/auth.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService
    ) {}

  async signUp(data: UserInput) {
    return this.prismaService.user.create({data});
  }

  async signIn(data: UserInput) {
    const user = await this.prismaService.user.findUnique({where: {
      email: data.email
    }});

    if (!user) {
      throw new UnauthorizedException("User not found: " + (data.email));
    }

    // Ideally we would stored salted hash instead of plaintext
    if (user.password !== data.password) {
      throw new UnauthorizedException("Incorrect password.");
    }

    const jwtPayload = {id: user.id, username: user.email, role: user.role};

    return {
      access_token: await this.jwtService.signAsync(jwtPayload)
    }
  }
}
