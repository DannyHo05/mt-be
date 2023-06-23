import { Expose } from "class-transformer";
export class CreateMessageDto {
  @Expose()
  userId: string;
  @Expose()
  groupId: string;
  @Expose()
  content: string;
}
