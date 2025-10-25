import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { envs } from 'src/config';
import { AccessToken } from '../interfaces/access-token.interface';
import { FullToken } from '../interfaces/full-token.interface';
import { RefreshToken } from '../interfaces/refresh-token.interface';
import { PayloadJwt } from '../interfaces/payload-jwt.interface';

/**
 * Service responsible for JWT token generation and validation
 * Handles access tokens and refresh tokens with proper expiration times
 */
@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  /**
   * Generates an access token for the authenticated user
   * @param payload - User data to include in the token
   * @returns Object containing access token and expiration time
   */
  async generateAccessToken(payload: PayloadJwt): Promise<AccessToken> {
    const accessTokenExpiresIn = envs.jwtAccessExp;

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: `${accessTokenExpiresIn}s`,
      secret: envs.jwtAccessSecret,
    });

    return {
      accessToken,
      accessTokenExpiresIn,
    };
  }

  /**
   * Generates a refresh token for the authenticated user
   * @param payload - User data to include in the token
   * @returns Object containing refresh token and expiration time
   */
  async generateRefreshToken(payload: PayloadJwt): Promise<RefreshToken> {
    const refreshTokenExpiresIn = envs.jwtRefreshExp;

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: `${refreshTokenExpiresIn}s`,
      secret: envs.jwtRefreshSecret,
    });

    return {
      refreshToken,
      refreshTokenExpiresIn,
    };
  }

  /**
   * Generates both access and refresh tokens
   * @param payload - User data to include in the tokens
   * @returns Object containing both tokens and their expiration times
   */
  async generateTokens(payload: PayloadJwt): Promise<FullToken> {
    const [accessTokenData, refreshTokenData] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);
    const fullToken: FullToken = {
      ...accessTokenData,
      ...refreshTokenData,
    };

    return fullToken;
  }

  // /**
  //  * Verifies and decodes an access token
  //  * @param token - The access token to verify
  //  * @returns Decoded token payload
  //  */
  // async verifyAccessToken(token: string): Promise<any> {
  //   const payload = await this.jwtService.verifyAsync(token, {
  //     secret: envs.jwtAccessSecret,
  //   });
  //   console.log('payload', payload);
  //   return payload;
  // }

  /**
   * Verifies and decodes a refresh token
   * @param token - The refresh token to verify
   * @returns Decoded token payload
   */
  async verifyRefreshToken(token: string): Promise<PayloadJwt> {
    const payload: PayloadJwt = await this.jwtService.verifyAsync(token, {
      secret: envs.jwtRefreshSecret,
    });
    return payload;
  }
}
