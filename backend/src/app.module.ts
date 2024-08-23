import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './modules/student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './config/database.config';
import { SubjectModule } from './modules/subject/subject.module';
import { AuthModule } from './modules/auth/auth.module';
import { APIUsageModule } from './modules/apiusage/apiusage.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { UsersModule } from './modules/users/users.module';
import { Users } from './modules/users/entity/users.entity';
import { Message } from './modules/messages/message.entity';
import { Group } from './modules/groups/group.entity';
import { GroupMember } from './modules/groups/groupmember.entity';
import { MessagesController } from './modules/messages/messages.controller';
import { UsersController } from './modules/users/users.controller';
import { MessagesService } from './modules/messages/messages.service';
import { GroupsService } from './modules/groups/groups.service';
import { UsersService } from './modules/users/users.service';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),

    TypeOrmModule.forFeature([Users, Message, Group, GroupMember]),

    StudentModule,
    SubjectModule,
    AuthModule,
    APIUsageModule,
    MonitoringModule,
    UsersModule,

  ],
  controllers: [AppController,MessagesController, UsersController],
  providers: [AppService,MessagesService, GroupsService, UsersService],
})
export class AppModule  {}
