import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGroupMessageDto {
  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @IsNotEmpty()
  @IsNumber()
  groupId: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
