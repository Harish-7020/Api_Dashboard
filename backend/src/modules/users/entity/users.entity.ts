// import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
// import { APIUsage } from 'src/modules/apiusage/entity/api-usage.entity';

// @Entity()
// export class Users {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ unique: true })
//   username: string;

//   @Column()
//   password: string;

//   @OneToMany(() => APIUsage, apiUsage => apiUsage.user)
//   apiUsage: APIUsage[];
// }

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from 'src/modules/messages/message.entity';
import { GroupMember } from 'src/modules/groups/groupmember.entity';
import { APIUsage } from 'src/modules/apiusage/entity/api-usage.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => APIUsage, apiUsage => apiUsage.user)
  apiUsage: APIUsage[];

  @OneToMany(() => Message, message => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, message => message.receiver)
  receivedMessages: Message[];

  @OneToMany(() => GroupMember, groupMember => groupMember.user)
  groups: GroupMember[];

  @OneToMany(() => GroupMember, groupMember => groupMember.user)
  groupMemberships: GroupMember[];
}
