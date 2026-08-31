import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { registerDto } from 'src/auth/dto/register.user.dto';
import { User } from './schemas/user.schema';
import { LoginUserDTO } from 'src/auth/dto/login.user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: registerDto) {
    try {
      return await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (err: unknown) {
      const error = err as { code?: number };
      const DUPLICATE_KEY_ERROR_CODE = 11000;
      if (error.code === DUPLICATE_KEY_ERROR_CODE) {
        throw new ConflictException('The Email is already exist');
      }
      throw err;
    }
  }
  async findOne(loginUserDto: LoginUserDTO) {
    try {
      return await this.userModel.findOne({ email: loginUserDto.email }).lean();
    } catch (err) {
      console.log(err);
      throw new ConflictException('Login Failed');
    }
  }
}
