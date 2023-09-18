import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { Reflector } from '@nestjs/core';
  
  @Injectable()
  /*
    Validate access token
  */
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      return await this.handleActivation(context, false);
    }
  
    protected async handleActivation(context: ExecutionContext, isRefreshToken: boolean) {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Token not found.');
      }
      try {
        const secret = isRefreshToken ? jwtConstants.refreshTokenSecret : jwtConstants.accessTokenSecret;
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: secret
          }
        );
        request['user'] = {
          user: payload.username,
          role: payload.role,
        };
      } catch (error) {
        throw new UnauthorizedException('Invalid token : ' + error);
      }
      return true;
    }

    protected extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }

  @Injectable()
  /*
    Similar to AuthGuard, but it validates a refresh token (based on refresh secret)
  */
  export class RefreshGuard extends AuthGuard {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      return await super.handleActivation(context, true);
    }
  }

  @Injectable()
  export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext) {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const user = request.user;
      return this.matchRoles(roles, user.role);
    }

    private matchRoles(roles: string[], userRole: string) {
      return roles.some((role) => role === userRole);
    }
  }

  