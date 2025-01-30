import {
  IsDateString,
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsPhoneNumber()
  cellPhone: string;

  @IsDateString()
  birthDate: Date;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
