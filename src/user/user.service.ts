import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async getInfo() {
        return await this.prismaService.user.findUnique({
            where: { id: 1 },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    }
}
