import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthLoginDto, AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private readonly primaService: PrismaService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signUp(payload: AuthDto) {
    try {
      const hashPassword = await bcrypt.hash(payload.password, 10);
      const groupApp = await this.primaService.groupApp.findUnique({
        where: {
          id: '50e0c7f9-998d-416e-b098-1e7a73a6f6d5',
        },
      });
      const user = await this.primaService.user.create({
        data: {
          ...payload,
          password: hashPassword,
          group_app: {
            connect: {
              id: groupApp.id,
            },
          },
        },
        select: {
          username: true,
          first_name: true,
          last_name: true,
          id: true,
        },
      });
      return user;
    } catch (e) {
      throw new BadRequestException('Email already exist!');
    }
  }
  async login(payload: AuthLoginDto) {
    const user = await this.primaService.user.findUnique({
      where: {
        username: payload.username,
      },
    });
    if (!user) {
      throw new ForbiddenException('Incorect login information!');
    }
    const isMatchPassword = await bcrypt.compare(
      payload.password,
      user.password,
    );
    if (!isMatchPassword) {
      throw new ForbiddenException('Incorect password!');
    }
    delete user.password;
    const token = await this.convertObjToJwt(user.id, user.username);
    return {
      status: true,
      ...token,
    };
  }

  private async convertObjToJwt(
    userId: string,
    username: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      username,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '1d',
    });
    return { accessToken };
  }
}
