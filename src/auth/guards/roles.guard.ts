// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Role } from '@prisma/client';

// /**
//  * Roles Guard for protecting routes based on user roles
//  * Validates that the authenticated user has the required roles
//  */
// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   /**
//    * Determines if the user has the required roles to access the route
//    * @param context - Execution context
//    * @returns Boolean indicating if user has required roles
//    */
//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (!requiredRoles) {
//       return true;
//     }

//     const { user } = context.switchToHttp().getRequest();
    
//     if (!user) {
//       return false;
//     }

//     return requiredRoles.some((role) => user.roles?.includes(role));
//   }
// }

