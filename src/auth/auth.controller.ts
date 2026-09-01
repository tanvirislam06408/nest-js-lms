import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.user.dto';
import { LoginUserDTO } from './dto/login.user.dto';
import { AuthGuard } from './auth.grud';
import { UserService } from 'src/user/user.service';

@Controller('auth') // /auth/register for signIn
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('register')
  async register(@Body() registerUserDto: registerDto) {
    const token = await this.authService.registerUser(registerUserDto);
    return token;
  }
  @Post('login')
  login(@Body() loginUserDto: LoginUserDTO) {
    const loginUser = this.authService.loginUser(loginUserDto);
    return loginUser;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub as string;
    const user = await this.userService.getOneUserId(userId);
    
    return user;
  }
}
