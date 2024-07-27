import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Students } from './entity/student.entity';
import { Subjects } from '../subject/entity/subject.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';


@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students)
    private studentsRepository: Repository<Students>,
    @InjectRepository(Subjects)
    private subjectsRepository: Repository<Subjects>,

  ) {}

  findAll(): Promise<Students[]> {
    return this.studentsRepository.find();
  }

  findOne(id: number): Promise<Students> {
    return this.studentsRepository.findOne({
      where: { id },
      relations: ['subject'],
    });
  }

  create(createStudentDto : CreateStudentDto): Promise<Students> {
    return this.studentsRepository.save(createStudentDto);
  }

  async update(id: number,updateStudentDto: UpdateStudentDto): Promise<void> {
    await this.studentsRepository.update(id, updateStudentDto);
  }

  async remove(id: number): Promise<void> {
    await this.subjectsRepository.delete({ student: { id } });
    await this.studentsRepository.delete(id);
  }
  }
