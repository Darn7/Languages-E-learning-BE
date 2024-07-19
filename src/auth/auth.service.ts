import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO, LoginDTO, RegisterDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from './strategy/jwt.service';

@Injectable({})
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) {}

    async register(registerDTO: RegisterDTO) {
        const hashedPassword = await this.hashPassword(registerDTO.password);
        const user = await this.prismaService.user.create({
            data: {
                name: registerDTO.name,
                email: registerDTO.email,
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

    async login(loginDTO: LoginDTO) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: {
                    email: loginDTO.email,
                },
            });
            if (!user) {
                throw new ForbiddenException('User not found!!!');
            }
            const passwordMatch = await this.passwordMatch(
                loginDTO.password,
                user.password,
            );
            if (!passwordMatch) {
                throw new ForbiddenException('Invalid password!!!');
            }
            return this.jwtService.signToken(user.id, user.email);
        } catch (e) {
            throw new ForbiddenException(e);
        }
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    private async passwordMatch(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}
