import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from '../dtos';
import { Account, AuthProvider, PrismaClient, User } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '../services/jwt.service';
// import { AnonymousService } from '../services/anonymous.service';
// import { UserConversionService } from '../services/user-conversion.service';
import * as bcrypt from 'bcryptjs';
import {
  AccessUser,
  validateUser,
  validateUserWithOutPassword,
} from '../interfaces';
import { PayloadJwt } from '../interfaces/payload-jwt.interface';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    // private readonly anonymousService: AnonymousService,
    // private readonly userConversionService: UserConversionService,
  ) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('MongoDB Connected');
  }

  /**
   * Validates user credentials for authentication
   * @param email - User's email address
   * @param password - User's password
   * @returns User object if credentials are valid, null otherwise
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<validateUserWithOutPassword | null> {
    const user: validateUser | null = await this.user.findUnique({
      where: { email },
      include: {
        Accounts: {
          where: { provider: AuthProvider.LOCAL },
        },
      },
    });

    if (!user || !user.Accounts.length) {
      return null;
    }

    const account = user.Accounts[0];
    if (!account.passwordHash) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      account.passwordHash,
    );

    if (!isPasswordValid) {
      return null;
    }

    // Remove password hash from response
    const { passwordHash, ...accountWithoutPassword } = account;
    return {
      ...user,
      Accounts: [{ ...accountWithoutPassword }],
    };
  }

  /**
   * Handles user login and returns JWT tokens
   * @param loginUserDto - Login credentials
   * @returns User data with JWT tokens
   */
  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: PayloadJwt = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
      provider: AuthProvider.LOCAL,
    };

    const tokens = await this.jwtService.generateTokens(payload);

    const accessUser: AccessUser = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles,
        provider: user.provider,
      },
      ...tokens,
    };
    return accessUser;
  }

  /**
   * Handles user registration and returns JWT tokens
   * @param registerUserDto - Registration data
   * @returns User data with JWT tokens
   */
  async registerUser(registerUserDto: RegisterUserDto) {
    const { email, name, password } = registerUserDto;

    const existingUser = await this.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const userCreated = await this.user.create({
      data: {
        email,
        name,
        Accounts: {
          create: {
            provider: AuthProvider.LOCAL,
            passwordHash,
            email,
          },
        },
      },
    });

    const payload: PayloadJwt = {
      sub: userCreated.id,
      email: userCreated.email,
      roles: userCreated.roles,
      provider: AuthProvider.LOCAL,
    };

    const tokens = await this.jwtService.generateTokens(payload);
    const accessUser: AccessUser = {
      user: {
        id: userCreated.id,
        email: userCreated.email,
        name: userCreated.name ?? '',
        roles: userCreated.roles,
        provider: userCreated.provider,
      },
      ...tokens,
    };
    return accessUser;
  }

  // /**
  //  * Verifies a JWT token and returns user information
  //  * @param token - JWT token to verify
  //  * @returns User information from token
  //  */
  // async verifyUser(token: string) {
  //   try {
  //     const payload = await this.jwtService.verifyAccessToken(token);
  //     return payload;
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid token');
  //   }
  // }

  /**
   * Refreshes access token using refresh token
   * @param refreshToken - Valid refresh token
   * @returns New access token
   */
  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyRefreshToken(refreshToken);

      // Generate new access token
      const newAccessToken = await this.jwtService.generateAccessToken(payload);

      return newAccessToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // /**
  //  * Generates an anonymous token for unregistered users
  //  * @returns Anonymous user data with temporary token
  //  */
  // async generateAnonymousToken() {
  //   return this.anonymousService.generateAnonymousToken();
  // }

  // /**
  //  * Converts an anonymous user to a registered user
  //  * @param convertUserDto - Conversion data including anonymous token and user data
  //  * @returns New user data with real tokens
  //  */
  // async convertAnonymousUser(convertUserDto: any) {
  //   return this.userConversionService.convertAnonymousToUser(
  //     convertUserDto.anonymousToken,
  //     {
  //       email: convertUserDto.email,
  //       name: convertUserDto.name,
  //       password: convertUserDto.password,
  //     },
  //   );
  // }

  // /**
  //  * Validates if a token can be converted from anonymous to registered
  //  * @param token - Token to validate
  //  * @returns Boolean indicating if conversion is possible
  //  */
  // async canConvertToken(token: string) {
  //   return this.userConversionService.canConvertToken(token);
  // }

  // /**
  //  * Gets the anonymous user ID from a token
  //  * @param token - Anonymous token
  //  * @returns Anonymous user ID
  //  */
  // async getAnonymousUserId(token: string) {
  //   return this.userConversionService.getAnonymousUserId(token);
  // }
}
