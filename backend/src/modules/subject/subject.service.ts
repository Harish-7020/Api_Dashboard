import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subjects } from './entity/subject.entity';
import { Students } from '../student/entity/student.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subjects)
    private subjectsRepository: Repository<Subjects>,
    @InjectRepository(Students)
    private studentsRepository: Repository<Students>,
  ) {}

  findAll(): Promise<Subjects[]> {
    return this.subjectsRepository.find();
  }

  findOne(id: number): Promise<Subjects> {
    return this.subjectsRepository.findOne({
      where: { id },
      relations: ['student'],
    });
  }
  findByStudentIdAll(): Promise<Subjects[]> {
    return this.subjectsRepository.find({ relations: ['student'] });
  }



  findByStudentId(studentId: number): Promise<Subjects[]> {
    return this.subjectsRepository.find({
      where: { student: { id: studentId } },
      relations: ['student'],
    });
  }

  async create(createSubjectDto : CreateSubjectDto): Promise<Subjects> {
    const student = await this.studentsRepository.findOne({ where: { id: createSubjectDto.StudentID } });
    if (!student) {
      throw new Error('Student not found');
    }
    // subject.student = student;
    return this.subjectsRepository.save(createSubjectDto);
  }

  async update(id: number, updateSubjectDto :UpdateSubjectDto): Promise<void> {
    await this.subjectsRepository.update(id, updateSubjectDto);
  }

  async remove(id: number): Promise<void> {
    await this.subjectsRepository.delete(id);
  }
}




