import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class LoginDTO extends AuthDTO {
    @IsOptional()
    name: never; // Loại bỏ trường `name` khỏi DTO đăng nhập
}

export class RegisterDTO extends AuthDTO {
    // Không cần thêm gì ở đây vì `RegisterDTO` sẽ sử dụng tất cả các trường từ `AuthDTO`
}
