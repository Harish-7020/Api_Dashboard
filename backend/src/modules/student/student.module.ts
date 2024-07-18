import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from './entity/student.entity';
import { StudentsService } from './student.service';
import { StudentsController } from './student.controller';
import { Subjects } from '../subject/entity/subject.entity';
import { Users } from '../users/entity/users.entity';
import { APIUsage } from '../apiusage/entity/api-usage.entity';
import { APIUsageModule } from '../apiusage/apiusage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subjects, Students, Users]),APIUsageModule],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentModule {}
