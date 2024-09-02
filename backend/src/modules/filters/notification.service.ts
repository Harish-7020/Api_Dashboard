import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class NotificationService {
  private server: Server;

  setSocketServer(server: Server) {
    this.server = server;
  }

  sendAlert(title: string, message: string) {
    console.log(`ALERT: ${title} - ${message}`);
    if (this.server) {
      this.server.emit('alert', { title, message });
    }
  }
}
