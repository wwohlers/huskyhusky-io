import { User } from '../interfaces/User';

export interface SignInResponseDto {
  user: User,
  token: string;
}
