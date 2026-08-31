import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.user.dto';
import { LoginUserDTO } from './dto/login.user.dto';

@Controller('auth') // /auth/register for signIn
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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
}
