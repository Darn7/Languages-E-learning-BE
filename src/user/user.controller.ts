import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthUser, Description } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('User APIs')
@Controller('user')
export class UserController {
    constructor() {}
    @Get('me')
    @Description('Lấy thông tin tài khoản user')
    getInfo(@AuthUser() user: User) {
        return user;
    }
}
