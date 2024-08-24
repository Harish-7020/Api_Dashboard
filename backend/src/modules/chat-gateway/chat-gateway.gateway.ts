import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
import { UsersService } from '../users/users.service';
import { GroupsService } from '../groups/groups.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService
  ) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: any): Promise<void> {
    const { senderId, receiverId, groupId, message } = payload;
  
    // Fetch sender details
    const sender = await this.usersService.findOne(senderId); 
    const senderName = sender.username;

    if (receiverId) {
      // Direct message
      const savedMessage = await this.messagesService.createMessage(senderId, receiverId, message);

      // Emit message to both the sender and receiver
      this.server.to(receiverId.toString()).emit('message', {
        senderName,
        message: savedMessage.message,
        timestamp: savedMessage.timestamp,
        senderId,
        receiverId
      });
      this.server.to(senderId.toString()).emit('message', {
        senderName,
        message: savedMessage.message,
        timestamp: savedMessage.timestamp,
        senderId,
        receiverId
      });
    } else if (groupId) {
      // Group message
      const savedMessage = await this.messagesService.createGroupMessage(senderId, groupId, message);

      // Emit message to all group members except the sender
      const groupMembers = await this.groupsService.getGroupMembers(groupId);
      groupMembers.forEach((member) => {
        const userId = member.user.id;
        if (userId !== senderId) {
          this.server.to(userId.toString()).emit('message', {
            senderName,
            groupId,
            message: savedMessage.message,
            timestamp: savedMessage.timestamp,
            senderId
          });
        }
      });

      // Also emit the message to the sender for consistency
      this.server.to(senderId.toString()).emit('message', {
        senderName,
        groupId,
        message: savedMessage.message,
        timestamp: savedMessage.timestamp,
        senderId
      });
    }
  }
}
