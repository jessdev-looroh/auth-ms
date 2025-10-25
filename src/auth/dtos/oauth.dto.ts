// import { IsString, IsOptional, IsEnum } from 'class-validator';
// import { AuthProvider } from '@prisma/client';

// /**
//  * DTO for OAuth2 authentication requests
//  * Used for Google, Facebook, and other OAuth providers
//  */
// export class OAuthDto {
//   @IsString()
//   @IsEnum(AuthProvider)
//   provider: AuthProvider;

//   @IsString()
//   accessToken: string;

//   @IsOptional()
//   @IsString()
//   refreshToken?: string;

//   @IsOptional()
//   @IsString()
//   idToken?: string;
// }

// /**
//  * DTO for OAuth2 callback responses
//  * Contains user information from OAuth provider
//  */
// export class OAuthCallbackDto {
//   @IsString()
//   email: string;

//   @IsString()
//   name: string;

//   @IsOptional()
//   @IsString()
//   avatarUrl?: string;

//   @IsString()
//   providerId: string;

//   @IsEnum(AuthProvider)
//   provider: AuthProvider;
// }
