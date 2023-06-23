import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exbe2db',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
      enableControllerDiscovery: true,
    }),
    MessagesModule,
  ],
  providers: [MessagesGateway, MessagesService, PrismaService]
})
export class MessagesModule {}
