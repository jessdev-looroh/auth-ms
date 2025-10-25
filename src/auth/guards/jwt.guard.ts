// import { Injectable, ExecutionContext } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Reflector } from '@nestjs/core';

// /**
//  * JWT Guard for protecting routes that require authentication
//  * Validates JWT tokens and ensures user is authenticated
//  */
// @Injectable()
// export class JwtGuard extends AuthGuard('jwt') {
//   constructor(private reflector: Reflector) {
//     super();
//   }

//   /**
//    * Determines if the route should be accessible without authentication
//    * @param context - Execution context
//    * @returns Boolean indicating if route is public
//    */
//   canActivate(context: ExecutionContext) {
//     const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
//       context.getHandler(),
//       context.getClass(),
//     ]);
    
//     if (isPublic) {
//       return true;
//     }
    
//     return super.canActivate(context);
//   }
// }

