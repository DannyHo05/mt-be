import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { RabbitMqService } from './rabbit-mq/rabbit-mq.service';
import { MessageModule } from './message/message.module';
import { GroupModule } from './group/group.module';
import { GroupChatAppModule } from './group-chat-app/group-chat-app.module';
import { MessagesModule } from './messages/messages.module';
import { LoggerModule } from 'nestjs-pino';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/env/.env.development`,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    MessagesModule,
    GroupChatAppModule,
    GroupModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, RabbitMqService],
})
export class AppModule {}
