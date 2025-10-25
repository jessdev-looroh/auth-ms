import { AuthProvider, Role } from '@prisma/client';

export interface PayloadJwt {
  sub: string;
  email: string;
  roles: Role[];
  provider: AuthProvider;
}
