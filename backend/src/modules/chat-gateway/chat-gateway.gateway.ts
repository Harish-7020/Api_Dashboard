import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { MessagesService } from '../messages/messages.service';
import { GroupsService } from '../groups/groups.service';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
    private readonly groupsService: GroupsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: any): Promise<void> {
    const { senderId, receiverId, groupId, message } = payload;

    if (receiverId) {
      // Direct message
      await this.messagesService.createMessage(senderId, receiverId, message);
      this.server.to(receiverId).emit('message', { senderId, message });
    } else if (groupId) {
      // Group message
      await this.messagesService.createGroupMessage(senderId, groupId, message);
      const groupMembers = await this.groupsService.getGroupMembers(groupId);
      groupMembers.forEach((member) => {
        if (member.userId !== senderId) {
          this.server.to(member.userId.toString()).emit('message', { senderId, groupId, message });
        }
        
      });
    }
  }

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
