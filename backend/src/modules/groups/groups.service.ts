import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { GroupMember } from './groupmember.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    @InjectRepository(GroupMember)
    private groupMembersRepository: Repository<GroupMember>,
  ) {}

  async getGroupMembers(groupId: number): Promise<GroupMember[]> {
    return this.groupMembersRepository.find({ where: { group: { id: groupId } }, relations: ['user'] });
}
}
