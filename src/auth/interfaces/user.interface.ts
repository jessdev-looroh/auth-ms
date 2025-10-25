import { AuthProvider, Role } from "@prisma/client";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  roles: Role[];
  provider: AuthProvider;
}
