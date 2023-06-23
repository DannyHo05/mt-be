import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupChatAppDto } from './create-group-chat-app.dto';

export class UpdateGroupChatAppDto extends PartialType(CreateGroupChatAppDto) {}
