import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  login() {
    return {
      message: 'Login successful',
      user: {
        id: 1,
        username: 'john_doe',
        email: 'johndoe@gmail.com',
      },
    };
  }
}
