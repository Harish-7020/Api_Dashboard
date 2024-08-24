// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Users } from '../users/entity/users.entity';
// import { Group } from '../groups/group.entity';

// @Entity('Messages')
// export class Message {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Users, { nullable: false })
//   sender: Users;

//   @ManyToOne(() => Users, { nullable: true })
//   receiver: Users;

//   @ManyToOne(() => Group, { nullable: true })
//   group: Group;

//   @Column('nvarchar', { length: 'MAX' })
//   message: string;

//   @Column('datetime', { default: () => 'GETDATE()' })
//   timestamp: Date;
// }


// message.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/entity/users.entity';
import { Group } from '../groups/group.entity';

@Entity('Messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.sentMessages, { nullable: false })
  @JoinColumn({ name: 'senderId' })
  sender: Users;

  @ManyToOne(() => Users, user => user.receivedMessages, { nullable: true })
  @JoinColumn({ name: 'receiverId' })
  receiver: Users;

  @ManyToOne(() => Group, group => group.messages, { nullable: true })
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @Column('nvarchar', { length: 'MAX' })
  message: string;

  @Column('nvarchar', { length: 255 })
  senderName: string; // New column to store the sender's name

  @Column('datetime', { default: () => 'GETDATE()' })
  timestamp: Date;
}
