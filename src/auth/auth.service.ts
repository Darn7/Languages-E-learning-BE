import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}
    async register(authDTO: AuthDTO) {
        const hashedPassword = await bcrypt.hash(authDTO.password, 10);
        const user = await this.prismaService.user.create({
            data: {
                name: authDTO.name,
                email: authDTO.email,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
        return user;
    }

    async login(authDTO: AuthDTO) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: authDTO.email,
                },
            });
            if (!user) {
                throw new ForbiddenException('User not found!!!');
            }
            const passwordMatch = await bcrypt.compare(
                authDTO.password,
                user.password,
            );
            if (!passwordMatch) {
                throw new ForbiddenException('Invalid password!!!');
            }
            return this.signJwtToken(user.id, user.email);
        } catch (e) {
            throw new ForbiddenException(e);
        }
    }

    async signJwtToken(
        userId: number,
        email: string,
    ): Promise<{ accessToken: string }> {
        const payload = {
            sub: userId,
            email: email,
        };
        const jwtString = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '20m',
        });
        return {
            accessToken: jwtString,
        };
    }
}
