import { IsEmail, IsInt, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
