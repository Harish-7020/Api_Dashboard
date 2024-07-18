import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from 'src/modules/users/entity/users.entity';
@Entity({ name: 'APIUsage' })
export class APIUsage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, user => user.apiUsage)
  @JoinColumn({ name: 'userId' })
  user: Users;
  @Column()
  userId:number;

  @Column()
  requestMethod: string;

  @Column()
  endpoint: string;

  @Column()
  timestamp: Date;

  @Column()
  status: string;

  @Column({ nullable: true })
  errorDetails: string;
}


// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { Users } from 'src/modules/users/entity/users.entity';

// @Entity({ name: 'APIUsage' }) // Ensure the name matches your actual table name
// export class APIUsage {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Users, user => user.apiUsage, { eager: true })
//   @JoinColumn({ name: 'userId' })
//   user: Users;


//   @Column()
//   requestMethod: string;

//   @Column()
//   endpoint: string;

//   @Column({ type: 'datetime', default: () => 'GETDATE()' })
//   timestamp: Date;

//   @Column()
//   status: string;

//   @Column({ nullable: true })
//   errorDetails: string;
// }
