import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import {
  AmqpConnection,
  RabbitRPC,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { ConsumeMessage } from 'amqplib';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(
    private prismaService: PrismaService,
    private amqpService: AmqpConnection,
  ) {}
  // @RabbitSubscribe({
  //   exchange: 'exbe2db',
  //   routingKey: 'subscribe-db',
  //   queue: 'subscribe-queue',
  // })
  // public async pubSubHandler(msg: CreateMessageDto, amqpMsg: ConsumeMessage) {
  //   console.log(msg);
  //
  // }
  @RabbitRPC({
    exchange: 'exbe2db',
    routingKey: 'subscribe-db',
    queue: 'subscribe-queue',
  })
  public async rpcHandler(msg: CreateMessageDto) {
    console.log(msg);
    if (msg.groupId && msg.userId && msg.content) {
      const message = await this.prismaService.message.create({
        data: {
          userId: msg.userId,
          groupId: msg.groupId,
          content: msg.content,
        },
      });
      if (message) {
        const user = await this.prismaService.user.findUnique({
          where: {
            id: message.userId,
          },
          select: {
            first_name: true,
            last_name: true,
            createAt: true,
          },
        });
        return {
          ...message,
          sender: {
            first_name: user.first_name,
            last_name: user.last_name,
          },
        };
      }
    }
    return '';
  }
  create(createMessageDto: CreateMessageDto) {
    const msg = this.amqpService.request<CreateMessageDto>({
      payload: createMessageDto,
      exchange: 'exbe2db',
      routingKey: 'subscribe-db',
    });
    return msg;
  }

  findAll(groupId: string) {
    console.log(groupId);
    const message = this.prismaService.message.findMany({
      where: {
        id: groupId,
      },
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
    });
    return message;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
