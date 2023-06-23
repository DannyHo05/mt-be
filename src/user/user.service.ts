import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getProfile(payload: UserDto) {
    const user = payload;
    let groups = await this.prisma.group.findMany({
      where: {
        users: {
          some: {
            userId: payload.id,
          },
        },
      },
      select:{
        id:true,
        name:true,
      }
    });
    if (groups.length > 0) {
      groups = groups;
    } else groups = [];

    return {
      status: true,
      data: user,
      groups,
    };
  }
}
