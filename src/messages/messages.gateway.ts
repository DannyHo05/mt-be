import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Socket } from 'socket.io';
import { Server } from 'http';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';

@WebSocketGateway(8001, {
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const messages = await this.messagesService.create(createMessageDto);
    console.log(messages)
    this.server.emit('message', messages);
    return messages
  }

  @SubscribeMessage('findAllMessages')
  findAll(@MessageBody() groupId: string) {
    if(!groupId){
      return this.messagesService.findAll("");
            
    }
    return this.messagesService.findAll(groupId);
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messagesService.remove(id);
  }
  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket) {
    console.log(roomId);
    client.join(roomId);
    return { message: 'Joined the room successfully' };
  }
  @SubscribeMessage('typing')
  async typing() {}
}
