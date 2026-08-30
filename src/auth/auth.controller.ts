import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.user.dto';

@Controller('auth') // /auth/register for signIn
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() registerUserDto: registerDto) {
    const result = this.authService.registerUser(registerUserDto);
    return result;
  }
}
