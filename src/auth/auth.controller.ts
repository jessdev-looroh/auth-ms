import { Controller, Logger } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dtos';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}
  @MessagePattern('auth.register.user')
  registerUser(registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }
  @MessagePattern('auth.login.user')
  loginUser(loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @MessagePattern('auth.refresh.token')
  refreshToken(refreshToken: string) {
    try {
      this.logger.debug('Refreshing token...');
      return this.authService.refreshToken(refreshToken);
    } catch (err) {
      this.logger.error('Error refreshing token', err.stack);
      throw err;
    }
  }

  // @MessagePattern('auth.verify.user')
  // verifyUser(token: string) {
  //   return this.authService.verifyUser(token);
  // }

  // @MessagePattern('auth.anonymous.token')
  // generateAnonymousToken() {
  //   return this.authService.generateAnonymousToken();
  // }

  // @MessagePattern('auth.convert.anonymous')
  // convertAnonymousUser(convertUserDto: ConvertUserDto) {
  //   return this.authService.convertAnonymousUser(convertUserDto);
  // }

  // @MessagePattern('auth.can.convert')
  // canConvertToken(token: string) {
  //   return this.authService.canConvertToken(token);
  // }

  // @MessagePattern('auth.get.anonymous.id')
  // getAnonymousUserId(token: string) {
  //   return this.authService.getAnonymousUserId(token);
  // }
}
