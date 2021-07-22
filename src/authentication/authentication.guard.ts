import { AuthenticationService } from './authentication.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from './authentication.enum';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private _reflector: Reflector,
    private _authenticationService: AuthenticationService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this._reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if(!requiredRoles) {
      return true;
    } else {
      let user_type: number = this._authenticationService.user ? this._authenticationService.user.user_type : 0;
      return requiredRoles.some(el => user_type === el);
    }
  }
}