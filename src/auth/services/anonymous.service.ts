// import { Injectable } from '@nestjs/common';
// import { JwtService } from './jwt.service';

// /**
//  * Service for handling anonymous user authentication
//  * Manages temporary tokens for unregistered users
//  */
// @Injectable()
// export class AnonymousService {
//   constructor(private readonly jwtService: JwtService) {}

//   /**
//    * Generates a temporary token for anonymous users
//    * @returns Anonymous user data with temporary token
//    */
//   async generateAnonymousToken(): Promise<{
//     user: any;
//     accessToken: string;
//     expiresIn: number;
//   }> {
//     const anonymousId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
//     const payload = {
//       sub: anonymousId,
//       email: null,
//       roles: ['ANONYMOUS'],
//       provider: 'ANONYMOUS',
//       isAnonymous: true,
//     };

//     const tokenData = await this.jwtService.generateAccessToken(payload);

//     return {
//       user: {
//         id: anonymousId,
//         email: null,
//         roles: ['ANONYMOUS'],
//         provider: 'ANONYMOUS',
//         isAnonymous: true,
//       },
//       accessToken: tokenData.accessToken,
//       expiresIn: tokenData.expiresIn,
//     };
//   }

//   /**
//    * Validates if a token belongs to an anonymous user
//    * @param payload - JWT payload
//    * @returns Boolean indicating if user is anonymous
//    */
//   isAnonymousUser(payload: any): boolean {
//     return payload.isAnonymous === true && payload.roles?.includes('ANONYMOUS');
//   }
// }
