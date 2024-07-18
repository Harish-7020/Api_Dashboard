import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APIUsage } from './entity/api-usage.entity';
import { ApiUsageService } from './apiusage.service';
import { Users } from '../users/entity/users.entity';
import { Students } from '../student/entity/student.entity';
import { ApiUsageController } from './apiusage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([APIUsage, Users, Students])],
  providers: [ApiUsageService],
  exports: [ApiUsageService],
  controllers: [ApiUsageController],
})
export class APIUsageModule {}
