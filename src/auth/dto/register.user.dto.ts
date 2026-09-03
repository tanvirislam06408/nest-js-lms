import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/user/user.types';
export class registerDto {
  @IsNotEmpty()
  @IsString()
  fname: string;

  @IsOptional()
  @IsString()
  lname: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  role: UserRole;
}
