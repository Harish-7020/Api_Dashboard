import { Subjects } from 'src/modules/subject/entity/subject.entity';
import { Entity, Column,OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Students {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  Class: string;

  @Column()
  City: string;

  @Column()
  DOB: Date;

  @Column()
  Grade: string;

  @OneToMany(() => Subjects, (subject) => subject.student)
    subject: Subjects[];
  
}

