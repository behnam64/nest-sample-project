import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  AuthJWT: {mobile_number: string} | null = null;
  user: {user_type?: 0 | 1 | 2 | 3 | 4, _id?: string, mobile_number?: string} = {user_type: 0};
}
