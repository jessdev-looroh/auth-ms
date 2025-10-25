import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

/**
 * Local authentication strategy for email/password login
 * Validates user credentials using email and password
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email', // Use email instead of username
      passwordField: 'password',
    });
  }

  /**
   * Validates user credentials for local authentication
   * @param email - User's email address
   * @param password - User's password
   * @returns User object if credentials are valid
   * @throws UnauthorizedException if credentials are invalid
   */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log('user', user);
    return user;
  }
}

