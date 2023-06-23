import { Expose } from 'class-transformer';
import {IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @Expose()
  username: string;
  @Expose()
  @IsNotEmpty()
  first_name: string;
  @Expose()
  @IsNotEmpty()
  last_name: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AuthLoginDto {
  @IsEmail()
  @Expose()
  username:string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
