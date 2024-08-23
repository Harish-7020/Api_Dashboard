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
    const sender = await this.userRepository.findOne({where:{id:senderId}});
    const receiver = await this.userRepository.findOne({where:{id:receiverId}});

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
    });
    
    return this.messagesRepository.save(newMessage);
  }

  async createGroupMessage(senderId: number, groupId: number, message: string): Promise<Message> {
    const sender = await this.userRepository.findOne({where:{id:senderId}});
    const group = await this.groupRepository.findOne({where:{id:groupId}});

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
    });

    return this.messagesRepository.save(newMessage);
  }

  async getMessagesForUser(userId: number): Promise<Message[]> {
    return this.messagesRepository.find({
      where: [
        { sender: { id: userId } },
        { receiver: { id: userId } },
      ],
      relations: ['sender', 'receiver'],
    });
  }

  async getMessagesForGroup(groupId: number): Promise<Message[]> {
    return this.messagesRepository.find({
      where: { group: { id: groupId } },
      relations: ['sender', 'group'],
    });
  }
}
