import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
}
