// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { APIUsage } from './entity/api-usage.entity';
// import { Users } from '../users/entity/users.entity';

// @Injectable()
// export class APIUsageService {
//   constructor(
//     @InjectRepository(APIUsage)
//     private apiUsageRepository: Repository<APIUsage>,
//   ) {}

//   async logAPIUsage(data: Partial<APIUsage>): Promise<void> {
//     await this.apiUsageRepository.insert(data);
//   }

//   async logUsage(user: Users, requestMethod: string, endpoint: string, status: string, errorDetails: string = null) {
//     const apiUsage = this.apiUsageRepository.create({
//       user,
//       requestMethod,
//       endpoint,
//       status,
//       errorDetails,
//     });
//     await this.apiUsageRepository.save(apiUsage);
    
//   }
// }
// apiusage.service.ts
import { Injectable } from '@nestjs/common';
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
    const apiUsage = new APIUsage();
    apiUsage.userId = userId;
    apiUsage.requestMethod = requestMethod;
    apiUsage.endpoint = endpoint;
    apiUsage.timestamp = timestamp;
    apiUsage.status = status;
    apiUsage.errorDetails = errorDetails;
    await this.apiUsageRepository.save(apiUsage);
  }

  async findAll(): Promise<APIUsage[]> {
    return this.apiUsageRepository.find();
  }

  async getTotalRequests(): Promise<{ GET: number, POST: number, PUT: number, DELETE: number }> {
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
  }
}
