import { Module } from '@nestjs/common';
import { SubjectsController } from './subject.controller';
import { SubjectsService } from './subject.service';
import { Subjects } from './entity/subject.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from '../student/entity/student.entity';
import { Users } from '../users/entity/users.entity';
import { APIUsageModule } from '../apiusage/apiusage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subjects, Students, Users]),APIUsageModule],
  controllers: [SubjectsController],
  providers: [SubjectsService]
})
export class SubjectModule {}
