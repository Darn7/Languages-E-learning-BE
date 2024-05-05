import { Optional } from '@nestjs/common';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @Optional()
    @IsString()
    name: string;
}
