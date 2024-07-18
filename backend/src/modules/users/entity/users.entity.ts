import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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
}
