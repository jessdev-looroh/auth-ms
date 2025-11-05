import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
// import { AnonymousService } from './services/anonymous.service';
// import { UserConversionService } from './services/user-conversion.service';
import { AuthController } from './auth.controller';

import { LocalStrategy } from './strategies/local.strategy';
// import { JwtStrategy } from './strategies/jwt.strategy';

// import { JwtGuard } from './guards/jwt.guard';
// import { RolesGuard } from './guards/roles.guard';
import { envs } from 'src/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: envs.jwtAccessSecret,
      signOptions: {
        expiresIn: envs.jwtAccessExp,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    // AnonymousService,
    // UserConversionService,
    LocalStrategy,
    // JwtStrategy,
    // JwtGuard,
    // RolesGuard,
  ],
  // exports: [AuthService, JwtService, JwtGuard, RolesGuard],
})
export class AuthModule {}
