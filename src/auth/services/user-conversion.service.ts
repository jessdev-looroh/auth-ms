// import { Injectable, Logger } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// import { JwtService } from './jwt.service';
// import { AnonymousService } from './anonymous.service';

// /**
//  * Service responsible for converting anonymous users to registered users
//  * Handles token migration, data transfer, and user identity conversion
//  */
// @Injectable()
// export class UserConversionService extends PrismaClient {
//   private readonly logger = new Logger(UserConversionService.name);

//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly anonymousService: AnonymousService,
//   ) {
//     super();
//   }

//   /**
//    * Converts an anonymous user to a registered user
//    * @param anonymousToken - Current anonymous token
//    * @param userData - New user registration data
//    * @returns New user data with real tokens
//    */
//   async convertAnonymousToUser(
//     anonymousToken: string,
//     userData: {
//       email: string;
//       name: string;
//       password: string;
//     },
//   ): Promise<{
//     user: any;
//     accessToken: string;
//     refreshToken: string;
//     accessTokenExpiresIn: number;
//     refreshTokenExpiresIn: number;
//   }> {
//     try {
//       // 1. Verify the anonymous token
//       const anonymousPayload = await this.jwtService.verifyAccessToken(anonymousToken);
      
//       if (!this.anonymousService.isAnonymousUser(anonymousPayload)) {
//         throw new Error('Invalid anonymous token');
//       }

//       const anonymousUserId = anonymousPayload.sub;

//       // 2. Check if email already exists
//       const existingUser = await this.user.findUnique({
//         where: { email: userData.email },
//       });

//       if (existingUser) {
//         throw new Error('User already exists with this email');
//       }

//       // 3. Create new registered user
//       const saltRounds = 12;
//       const passwordHash = await require('bcryptjs').hash(userData.password, saltRounds);

//       const newUser = await this.user.create({
//         data: {
//           email: userData.email,
//           name: userData.name,
//           Accounts: {
//             create: {
//               provider: 'LOCAL',
//               passwordHash,
//               email: userData.email,
//             },
//           },
//         },
//       });

//       // 4. Generate new tokens for the registered user
//       const payload = {
//         sub: newUser.id,
//         email: newUser.email,
//         roles: newUser.roles,
//         provider: 'LOCAL',
//         isAnonymous: false,
//       };

//       const tokens = await this.jwtService.generateTokens(payload);

//       // 5. Log the conversion for tracking
//       this.logger.log(`Anonymous user ${anonymousUserId} converted to registered user ${newUser.id}`);

//       return {
//         user: {
//           id: newUser.id,
//           email: newUser.email,
//           name: newUser.name,
//           roles: newUser.roles,
//           provider: newUser.provider,
//           isAnonymous: false,
//         },
//         ...tokens,
//       };
//     } catch (error) {
//       this.logger.error(`Error converting anonymous user: ${error.message}`);
//       throw error;
//     }
//   }

//   /**
//    * Migrates data from anonymous user to registered user
//    * This method should be called by other microservices
//    * @param anonymousUserId - ID of the anonymous user
//    * @param newUserId - ID of the new registered user
//    * @returns Success status
//    */
//   async migrateUserData(anonymousUserId: string, newUserId: string): Promise<boolean> {
//     try {
//       this.logger.log(`Starting data migration from ${anonymousUserId} to ${newUserId}`);
      
//       // This method will be called by other microservices
//       // The actual data migration happens in each microservice
//       // This is just for logging and coordination
      
//       return true;
//     } catch (error) {
//       this.logger.error(`Error migrating user data: ${error.message}`);
//       return false;
//     }
//   }

//   /**
//    * Validates if a token is anonymous and can be converted
//    * @param token - Token to validate
//    * @returns Boolean indicating if token can be converted
//    */
//   async canConvertToken(token: string): Promise<boolean> {
//     try {
//       const payload = await this.jwtService.verifyAccessToken(token);
//       return this.anonymousService.isAnonymousUser(payload);
//     } catch (error) {
//       return false;
//     }
//   }

//   /**
//    * Gets the anonymous user ID from a token
//    * @param token - Anonymous token
//    * @returns Anonymous user ID
//    */
//   async getAnonymousUserId(token: string): Promise<string | null> {
//     try {
//       const payload = await this.jwtService.verifyAccessToken(token);
//       if (this.anonymousService.isAnonymousUser(payload)) {
//         return payload.sub;
//       }
//       return null;
//     } catch (error) {
//       return null;
//     }
//   }
// }
