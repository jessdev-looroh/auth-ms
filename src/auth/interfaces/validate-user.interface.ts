import { Account, User } from '@prisma/client';

export interface validateUser extends User {
  Accounts: Account[];
}

export interface validateUserWithOutPassword extends User {
  Accounts: Omit<Account, 'passwordHash'>[];
}
