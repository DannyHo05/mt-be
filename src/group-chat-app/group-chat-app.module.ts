import { Module } from '@nestjs/common';
import { GroupChatAppService } from './group-chat-app.service';
import { GroupChatAppController } from './group-chat-app.controller';

@Module({
  controllers: [GroupChatAppController],
  providers: [GroupChatAppService]
})
export class GroupChatAppModule {}
