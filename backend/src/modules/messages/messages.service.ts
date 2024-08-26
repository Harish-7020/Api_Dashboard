import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { Users } from '../users/entity/users.entity';
import { Group } from '../groups/group.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async createMessage(senderId: number, receiverId: number, message: string): Promise<Message> {
    try {
      const sender = await this.userRepository.findOne({ where: { id: senderId } });
      const receiver = await this.userRepository.findOne({ where: { id: receiverId } });
    
      if (!sender) {
        throw new NotFoundException(`Sender with ID ${senderId} not found`);
      }
    
      if (!receiver) {
        throw new NotFoundException(`Receiver with ID ${receiverId} not found`);
      }
    
      const newMessage = this.messagesRepository.create({
        sender,
        receiver,
        message,
        senderName: sender.username, 
      });
    
      return this.messagesRepository.save(newMessage);
    } catch (error) {
      await this.sendErrorNotification(`Error creating direct message: ${error.message}`);
      throw error;
    }
  }

  async createGroupMessage(senderId: number, groupId: number, message: string): Promise<Message> {
    try {
      const sender = await this.userRepository.findOne({ where: { id: senderId } });
      const group = await this.groupRepository.findOne({ where: { id: groupId } });
    
      if (!sender) {
        throw new NotFoundException(`Sender with ID ${senderId} not found`);
      }
    
      if (!group) {
        throw new NotFoundException(`Group with ID ${groupId} not found`);
      }
    
      const newMessage = this.messagesRepository.create({
        sender,
        group,
        message,
        senderName: sender.username, 
      });
    
      return this.messagesRepository.save(newMessage);
    } catch (error) {
      await this.sendErrorNotification(`Error creating group message: ${error.message}`);
      throw error;
    }
  }
  
  async getMessagesForUser(userId: number): Promise<Message[]> {
    try {
      return this.messagesRepository.find({
        where: [
          { sender: { id: userId } },
          { receiver: { id: userId } },
        ],
        relations: ['sender', 'receiver'],
        order: { timestamp: 'ASC' },
      });
    } catch (error) {
      await this.sendErrorNotification(`Error retrieving messages for user ${userId}: ${error.message}`);
      throw error;
    }
  }

  async getMessagesForGroup(groupId: number): Promise<Message[]> {
    try {
      return this.messagesRepository.find({
        where: { group: { id: groupId } },
        relations: ['sender', 'group'],
        order: { timestamp: 'ASC' },
      });
    } catch (error) {
      await this.sendErrorNotification(`Error retrieving messages for group ${groupId}: ${error.message}`);
      throw error;
    }
  }

  async getMessagesForDirect(userId: number, recipientId: number): Promise<Message[]> {
    try {
      return this.messagesRepository.createQueryBuilder('message')
        .leftJoinAndSelect('message.sender', 'sender') 
        .where('(message.senderId = :userId AND message.receiverId = :recipientId) OR (message.senderId = :recipientId AND message.receiverId = :userId)', { userId, recipientId })
        .orderBy('message.timestamp', 'ASC')
        .select(['message', 'sender.username']) 
        .getMany();
    } catch (error) {
      await this.sendErrorNotification(`Error retrieving direct messages between users ${userId} and ${recipientId}: ${error.message}`);
      throw error;
    }
  }

  private async sendErrorNotification(errorMessage: string): Promise<void> {
    const testUser1 = await this.userRepository.findOne({ where: { username: 'testuser1' } });
    if (testUser1) {
      const errorNotification = this.messagesRepository.create({
        sender: testUser1,
        message: errorMessage,
        senderName: testUser1.username, 
      });
      await this.messagesRepository.save(errorNotification);
    }
  }
}
