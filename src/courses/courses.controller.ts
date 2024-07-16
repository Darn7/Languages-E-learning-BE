import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Description } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@ApiTags('Courses APIs')
@Controller('courses')
export class CoursesController {
    constructor() {}
    @Get('')
    @Description('Láy danh sách khóa học')
    getCourses(@Body() req: string) {
        return 'courses';
    }

    @Post('create')
    @Description('Tạo mới khóa học')
    createCourse() {
        return 'create course';
    }
}
