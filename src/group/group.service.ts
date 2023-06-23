import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private prismaService: PrismaService) {}
  create(createGroupDto: CreateGroupDto) {
    return 'This action adds a new group';
  }

  findAll(payload: string) {
    const groupDetail = this.prismaService.group.findUnique({
      where: {
        id: payload,
      },
      select: {
        messages: {
          select: {
            id: true,
            createAt: true,
            content: true,
            groupId: true,
            userId: true,
            sender: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
        id: true,
        name: true,
      },
    });
    return groupDetail;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
