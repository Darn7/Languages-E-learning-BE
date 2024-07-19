import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthUser, Description } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthDTO } from 'src/auth/dto';

@UseGuards(JwtGuard)
@ApiTags('User APIs')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('profile')
    @Description('Lấy thông tin tài khoản user')
    async getInfo(@Request() req) {
        return req.user;
    }
}
