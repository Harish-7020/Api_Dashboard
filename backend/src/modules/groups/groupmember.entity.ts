import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Users } from '../users/entity/users.entity';
import { Group } from './group.entity';

@Entity('GroupMembers')
export class GroupMember {
  @PrimaryColumn()
  groupId: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => Group, group => group.members)
  group: Group;

  @ManyToOne(() => Users, user => user.groupMemberships)
  user: Users;
}
