import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupChatAppService } from './group-chat-app.service';
import { CreateGroupChatAppDto } from './dto/create-group-chat-app.dto';
import { UpdateGroupChatAppDto } from './dto/update-group-chat-app.dto';

@Controller('group-chat-app')
export class GroupChatAppController {
  constructor(private readonly groupChatAppService: GroupChatAppService) {}

  @Post()
  create(@Body() createGroupChatAppDto: CreateGroupChatAppDto) {
    return this.groupChatAppService.create(createGroupChatAppDto);
  }

  @Get()
  findAll() {
    return this.groupChatAppService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupChatAppService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupChatAppDto: UpdateGroupChatAppDto) {
    return this.groupChatAppService.update(+id, updateGroupChatAppDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupChatAppService.remove(+id);
  }
}
