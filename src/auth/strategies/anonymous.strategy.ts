// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-custom';

// /**
//  * Anonymous authentication strategy for unregistered users
//  * Allows temporary access for purchase flow without registration
//  */
// @Injectable()
// export class AnonymousStrategy extends PassportStrategy(Strategy, 'anonymous') {
//   constructor() {
//     super();
//   }

//   /**
//    * Validates anonymous user access
//    * @param req - Request object
//    * @returns Anonymous user object
//    */
//   async validate(req: any): Promise<any> {
//     // Generate anonymous user data
//     return {
//       id: `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       email: null,
//       roles: ['ANONYMOUS'],
//       provider: 'ANONYMOUS',
//       isAnonymous: true,
//     };
//   }
// }
