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
import { ROLES, ID_TYPE } from './constants';
import { UsersService } from 'src/users/users.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, @Inject('UsersService') private readonly userService?: UsersService) {
    console.log("userService", userService)

  }

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
      if (roles && !roles.includes(request.user.role))
        return false

      if (checkAccess) {
        let id = request;
        checkAccess.idPath.split(".").forEach(k => {
          id = id[k.trim()]
        })
        if (checkAccess.idRole === ID_TYPE.USER) {
          if (request.user.role === ROLES.USER && request.user._id != id)
            return false
          if (request.user.role === ROLES.INSTITUTE_ADMIN) {
            let userData = await this.userService.getOne({ _id: id })
            if (!userData || userData.instituteId != request.user._id)
              return false
          }

        } else if (checkAccess.idRole === ID_TYPE.INSTITUTE && ((request.user.role === ROLES.USER && request.user.instituteId != id) || (request.user.role === ROLES.INSTITUTE_ADMIN && request.user.instituteId != id)))
          return false
      }
      return true;
    } else {
      const ctx: any = GqlExecutionContext.create(context).getContext();
      if (!ctx.headers.authorization) {
        return false;
      }
      ctx.user = await this.validateToken(ctx.headers.authorization);
      if (roles && !roles.includes(ctx.user.role))
        return false
      if (checkAccess) {
        let id = ctx;
        checkAccess.idPath.split(".").forEach(k => {
          id = id[k.trim()]
        })
        if (checkAccess.idRole === ID_TYPE.USER) {
          if (ctx.user.role === ROLES.USER && ctx.user._id != id)
            return false
          if (ctx.user.role === ROLES.INSTITUTE_ADMIN) {
            let userData = await this.userService.getOne({ _id: id })
            if (!userData || userData.instituteId != ctx.user._id)
              return false
          }

        } else if (checkAccess.idRole === ID_TYPE.INSTITUTE && ((ctx.user.role === ROLES.USER && ctx.user.instituteId != id) || (ctx.user.role === ROLES.INSTITUTE_ADMIN && ctx.user._id != id)))
          return false
      }
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
