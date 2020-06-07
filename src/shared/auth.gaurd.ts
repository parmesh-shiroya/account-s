import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { ROLES } from './constants';
import { UsersService } from 'src/users/users.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, @Inject('UsersService') private readonly userService?: UsersService) {
    console.log("userService", userService)

  }
  roles = [ROLES.ADMIN]
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const checkAccess = this.reflector.get('check_access', context.getHandler());
    if (!roles) {
      return true;
    }
    if (request) {
      if (!request.headers.authorization) {
        return false;
      }
      console.log(request.headers.authorization);
      request.user = await this.validateToken(request.headers.authorization);
      if (this.roles && !this.roles.includes(request.user.role))
        return false
      return true;
    } else {
      const ctx: any = GqlExecutionContext.create(context).getContext();
      if (!ctx.headers.authorization) {
        return false;
      }
      ctx.user = await this.validateToken(ctx.headers.authorization);
      if (this.roles && !this.roles.includes(ctx.user.role))
        return false
      return true;
    }
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];

    try {
      const decoded: any = await jwt.verify(token, process.env.SECRET);

      return decoded;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
