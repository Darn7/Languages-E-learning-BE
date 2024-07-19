import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
    constructor(
        private jwtService: NestJwtService,
        private configService: ConfigService,
    ) {}

    async signToken(
        userId: number,
        email: string,
    ): Promise<{ accessToken: string }> {
        const payload = {
            sub: userId,
            email: email,
        };
        const jwtString = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '365d',
        });
        return {
            accessToken: jwtString,
        };
    }
}
