import { Controller, Get } from '@nestjs/common';
import { ApiUsageService } from './apiusage.service';
import { APIUsage } from './entity/api-usage.entity';

@Controller('apiusage')
export class ApiUsageController {
  constructor(private readonly apiUsageService: ApiUsageService) {}

  @Get()
  findAll(): Promise<APIUsage[]> {
    return this.apiUsageService.findAll();
  }

  @Get('totals')
  getTotalRequests(): Promise<{ GET: number, POST: number, PUT: number, DELETE: number }> {
    return this.apiUsageService.getTotalRequests();
  }
  //traffic
  @Get('traffic')
  getNetworkTraffic() {
    return this.apiUsageService.getNetworkTraffic();
  }
}
