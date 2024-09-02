// // monitoring.gateway.ts
// import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
// import { MonitoringService } from './monitoring.service';
// import { Server } from 'socket.io';

// @WebSocketGateway()
// export class MonitoringGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;

//   constructor(private readonly monitoringService: MonitoringService) {}

//   handleConnection(client: any) {
//     console.log('Client connected:', client.id);
//   }

//   handleDisconnect(client: any) {
//     console.log('Client disconnected:', client.id);
//   }

//   afterInit(server: Server) {
//     console.log('WebSocket server initialized');
//     this.startMonitoring();
//   }


//   async startMonitoring() {
//     setInterval(async () => {
//       try {
//         const metrics = await this.monitoringService.getSystemMetrics();
//         // console.log('Emitting systemMetrics:', metrics); // Debugging log
//         this.server.emit('systemMetrics', metrics);
//       } catch (error) {
//         console.error('Error sending metrics:', error);
//       }
//     }, 1000); // Adjusted to 1 second for more frequent updates
//   }
// }
