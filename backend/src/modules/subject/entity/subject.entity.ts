import { Students } from "src/modules/student/entity/student.entity";
import { Column, Entity,JoinColumn,ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Subjects {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    Maths: number;

    @Column('int')
    Chemistry: number;

    @Column('int')
    Physics: number;

    @Column('int')
    ComputerScience: number; 

    @ManyToOne(() => Students, (student) => student.subject)
    @JoinColumn({name: 'StudentID'})
    student: Students;
    


}

