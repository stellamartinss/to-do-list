import { User } from './user';

export interface Auth extends User {
  password: string
}
