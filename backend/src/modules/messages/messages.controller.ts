import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  
  @Post('direct')
  async createDirectMessage(@Body() body: { senderId: number, receiverId: number, message: string }) {
    try {
      return await this.messagesService.createMessage(body.senderId, body.receiverId, body.message);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('group')
  async createGroupMessage(@Body() body: { senderId: number, groupId: number, message: string }) {
    try {
      return await this.messagesService.createGroupMessage(body.senderId, body.groupId, body.message);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('user/:userId')
  async getMessagesForUser(@Param('userId') userId: number) {
    try {
      return await this.messagesService.getMessagesForUser(userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('group/:groupId')
  async getMessagesForGroup(@Param('groupId') groupId: number) {
    try {
      return await this.messagesService.getMessagesForGroup(groupId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('direct/:userId/:recipientId')
  async getMessagesForDirect(
    @Param('userId') userId: number,
    @Param('recipientId') recipientId: number,
  ): Promise<Message[]> {
    try {
      return await this.messagesService.getMessagesForDirect(userId, recipientId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
