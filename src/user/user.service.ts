import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { registerDto } from 'src/auth/dto/register.user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: registerDto) {
    return await this.userModel.create({
      fname: registerUserDto.fname,
      lname: registerUserDto.lname,
      email: registerUserDto.email,
      password: registerUserDto.password,
    });
  }
}
