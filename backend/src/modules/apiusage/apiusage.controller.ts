import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiUsageService } from './apiusage.service';
import { APIUsage } from './entity/api-usage.entity';

@Controller('apiusage')
export class ApiUsageController {
  constructor(private readonly apiUsageService: ApiUsageService) {}

  @Get()
  async findAll(): Promise<APIUsage[]> {
    try {
      return await this.apiUsageService.findAll();
    } catch (error) {
      console.error('Error fetching API usage data:', error);
      throw new InternalServerErrorException('An error occurred while fetching API usage data');
    }
  }

  @Get('totals')
  async getTotalRequests(): Promise<{ GET: number, POST: number, PUT: number, DELETE: number }> {
    try {
      return await this.apiUsageService.getTotalRequests();
    } catch (error) {
      console.error('Error fetching total requests:', error);
      throw new InternalServerErrorException('An error occurred while fetching total requests');
    }
  }

  @Get('traffic')
  async getNetworkTraffic() {
    try {
      return await this.apiUsageService.getNetworkTraffic();
    } catch (error) {
      console.error('Error fetching network traffic data:', error);
      throw new InternalServerErrorException('An error occurred while fetching network traffic data');
    }
  }
}
