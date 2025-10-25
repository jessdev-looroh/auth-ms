import { FullToken, User } from './';

export interface AccessUser extends FullToken {
  user: User;
}
