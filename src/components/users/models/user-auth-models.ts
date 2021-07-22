import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class PostMobileModel {
  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  mobile_number: string;
}

