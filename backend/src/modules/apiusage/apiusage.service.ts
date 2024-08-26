import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { APIUsage } from './entity/api-usage.entity';

@Injectable()
export class ApiUsageService {
  constructor(
    @InjectRepository(APIUsage)
    private apiUsageRepository: Repository<APIUsage>,
  ) {}

  async logApiUsage(userId: number, requestMethod: string, endpoint: string, timestamp: Date, status: string, errorDetails: string) {
    try {
      const apiUsage = new APIUsage();
      apiUsage.userId = userId;
      apiUsage.requestMethod = requestMethod;
      apiUsage.endpoint = endpoint;
      apiUsage.timestamp = timestamp;
      apiUsage.status = status;
      apiUsage.errorDetails = errorDetails;
      await this.apiUsageRepository.save(apiUsage);
    } catch (error) {
      console.error('Error logging API usage:', error);
      throw new InternalServerErrorException('An error occurred while logging API usage');
    }
  }

  async findAll(): Promise<APIUsage[]> {
    try {
      return await this.apiUsageRepository.find();
    } catch (error) {
      console.error('Error fetching API usage data:', error);
      throw new InternalServerErrorException('An error occurred while fetching API usage data');
    }
  }

  async getTotalRequests(): Promise<{ GET: number, POST: number, PUT: number, DELETE: number }> {
    try {
      const getRequests = await this.apiUsageRepository.count({ where: { requestMethod: 'GET' } });
      const postRequests = await this.apiUsageRepository.count({ where: { requestMethod: 'POST' } });
      const putRequests = await this.apiUsageRepository.count({ where: { requestMethod: 'PUT' } });
      const deleteRequests = await this.apiUsageRepository.count({ where: { requestMethod: 'DELETE' } });

      return {
        GET: getRequests,
        POST: postRequests,
        PUT: putRequests,
        DELETE: deleteRequests,
      };
    } catch (error) {
      console.error('Error fetching total requests:', error);
      throw new InternalServerErrorException('An error occurred while fetching total requests');
    }
  }

  async getNetworkTraffic(): Promise<{ timestamp: string, count: number }[]> {
    try {
      const rawTrafficData = await this.apiUsageRepository.createQueryBuilder('apiUsage')
        .select('CONVERT(VARCHAR, apiUsage.timestamp, 23) as timestamp')
        .addSelect('COUNT(*) as count')
        .groupBy('CONVERT(VARCHAR, apiUsage.timestamp, 23)')
        .getRawMany();

      return rawTrafficData.map(data => ({
        timestamp: data.timestamp,
        count: Number(data.count)
      }));
    } catch (error) {
      console.error('Error fetching network traffic data:', error);
      throw new InternalServerErrorException('An error occurred while fetching network traffic data');
    }
  }
}
