import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decoratos';
import { Role } from '../../common/enums/rol.enums';

@Injectable()
export class RolesGuard implements CanActivate {
  
  constructor(private reflector:Reflector) {}


  canActivate(
    context: ExecutionContext,
  ): boolean {

    const roles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }

  const {user} = context.switchToHttp().getRequest();
    
  if(user.role === Role.ADMIN){
    return true;
  }
   return roles === user.role;

  }

}
