import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('direct')
  async createDirectMessage(@Body() body: { senderId: number, receiverId: number, message: string }) {
    return this.messagesService.createMessage(body.senderId, body.receiverId, body.message);
  }

  @Post('group')
  async createGroupMessage(@Body() body: { senderId: number, groupId: number, message: string }) {
    return this.messagesService.createGroupMessage(body.senderId, body.groupId, body.message);
  }

  @Get('user/:userId')
  async getMessagesForUser(@Param('userId') userId: number) {
    // Implement the method in MessagesService to retrieve messages for a user
    return this.messagesService.getMessagesForUser(userId);
  }

  @Get('group/:groupId')
  async getMessagesForGroup(@Param('groupId') groupId: number) {
    // Implement the method in MessagesService to retrieve messages for a group
    return this.messagesService.getMessagesForGroup(groupId);
  }
}
