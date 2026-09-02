import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  des: string;

  @IsString()
  @IsNotEmpty()
  lavel: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
