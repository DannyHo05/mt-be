import { Injectable } from '@nestjs/common';
import { CreateGroupChatAppDto } from './dto/create-group-chat-app.dto';
import { UpdateGroupChatAppDto } from './dto/update-group-chat-app.dto';

@Injectable()
export class GroupChatAppService {
  create(createGroupChatAppDto: CreateGroupChatAppDto) {
    return 'This action adds a new groupChatApp';
  }

  findAll() {
    return `This action returns all groupChatApp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupChatApp`;
  }

  update(id: number, updateGroupChatAppDto: UpdateGroupChatAppDto) {
    return `This action updates a #${id} groupChatApp`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupChatApp`;
  }
}
