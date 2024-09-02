import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  import { NotificationService } from './notification.service';
  
  @WebSocketGateway()
  export class NotificationsGateway {
    @WebSocketServer()
    server: Server;
  
    constructor(private notificationService: NotificationService) {}
  
    afterInit(server: Server) {
      this.notificationService.setSocketServer(server);
    }
  
    @SubscribeMessage('alert')
    handleMessage(client: any, payload: any): string {
      return 'Alert received';
    }
  }
  