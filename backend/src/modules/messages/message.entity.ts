import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from '../users/entity/users.entity';
import { Group } from '../groups/group.entity';

@Entity('Messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, { nullable: false })
  sender: Users;

  @ManyToOne(() => Users, { nullable: true })
  receiver: Users;

  @ManyToOne(() => Group, { nullable: true })
  group: Group;

  @Column('nvarchar', { length: 'MAX' })
  message: string;

  @Column('datetime', { default: () => 'GETDATE()' })
  timestamp: Date;
}


/*
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Group } from '../groups/group.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.sentMessages)
  sender: User;

  @ManyToOne(() => User, user => user.receivedMessages, { nullable: true })
  receiver: User;

  @ManyToOne(() => Group, group => group.messages, { nullable: true })
  group: Group;

  @Column('nvarchar', { length: 'max' })
  message: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}

*/