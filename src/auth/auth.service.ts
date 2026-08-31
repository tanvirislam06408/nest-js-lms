import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { registerDto } from './dto/register.user.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from './dto/login.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: registerDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltOrRounds);
    // logic for user register
    /*
    1.v ck if email already exist
    2.v hash the password
    3.v store the  user into db
    4. generate JWT token 
    5. send token into response

    */

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });

    const payload = { sub: user._id, username: user.fname };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }

  async loginUser(loginUserDto: LoginUserDTO) {
    const user = await this.userService.findOne(loginUserDto);
    if (!user) {
      throw new Error('User not found');
    }
    const isMatched = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isMatched) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }
}
