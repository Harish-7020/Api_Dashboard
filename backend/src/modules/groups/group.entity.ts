import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroupMember } from './groupmember.entity';
import { Message } from '../messages/message.entity';

@Entity('Groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('nvarchar', { length: 'MAX', nullable: true })
  description: string;

  @OneToMany(() => GroupMember, groupMember => groupMember.group)
  members: GroupMember[];

  @OneToMany(() => Message, message => message.group)
  messages: Message[];
}
