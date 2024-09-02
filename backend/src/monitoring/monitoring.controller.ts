// import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
// import { MonitoringService } from './monitoring.service';

// @Controller('monitoring')
// export class MonitoringController {
//   constructor(private readonly monitoringService: MonitoringService) {}

//   @Get()
//   async getSystemMetrics() {
//     try {
//       return await this.monitoringService.getSystemMetrics();
//     } catch (error) {
//       // Explicitly throw an error with a message
//       throw new HttpException(
//         {
//           status: HttpStatus.INTERNAL_SERVER_ERROR,
//           error: 'Failed to fetch system metrics',
//         },
//         HttpStatus.INTERNAL_SERVER_ERROR
//       );
//     }
//   }
// }

import { Controller, Get } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';

@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get()
  async getSystemMetrics() {
    return this.monitoringService.getSystemMetrics();
  }
}
