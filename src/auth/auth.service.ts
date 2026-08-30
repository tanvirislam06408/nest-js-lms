import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerDto } from './dto/register.user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(registerUserDto: registerDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltOrRounds);
    // logic for user register
    /*
    1. ck if email already exist
    2. hash the password
    3. store the  user into db
    4. generate JWT token 
    5. send token into response

    */
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });
    console.log(user);

    return {};
  }
}
