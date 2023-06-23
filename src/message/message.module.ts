import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  
  controllers: [MessageController],
  providers: [MessageService, PrismaService]
})
export class MessageModule {}
