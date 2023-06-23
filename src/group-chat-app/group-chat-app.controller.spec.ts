import { Test, TestingModule } from '@nestjs/testing';
import { GroupChatAppController } from './group-chat-app.controller';
import { GroupChatAppService } from './group-chat-app.service';

describe('GroupChatAppController', () => {
  let controller: GroupChatAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupChatAppController],
      providers: [GroupChatAppService],
    }).compile();

    controller = module.get<GroupChatAppController>(GroupChatAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
