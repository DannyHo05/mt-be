import { Test, TestingModule } from '@nestjs/testing';
import { GroupChatAppService } from './group-chat-app.service';

describe('GroupChatAppService', () => {
  let service: GroupChatAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupChatAppService],
    }).compile();

    service = module.get<GroupChatAppService>(GroupChatAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
