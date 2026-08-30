import { Injectable } from '@nestjs/common';
import { registerDto } from 'src/auth/dto/register.user.dto';

@Injectable()
export class UserService {
  createUser(registerUserDto: registerDto) {
    
    return { meg: 'created' };
  }
}
