import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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

  async findAll(): Promise<Subjects[]> {
    try {
      return await this.subjectsRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch subjects');
    }
  }

  async findOne(id: number): Promise<Subjects> {
    try {
      const subject = await this.subjectsRepository.findOne({
        where: { id },
        relations: ['student'],
      });
      if (!subject) {
        throw new NotFoundException(`Subject with ID ${id} not found`);
      }
      return subject;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch the subject');
    }
  }

  async findByStudentId(studentId: number): Promise<Subjects[]> {
    try {
      const subjects = await this.subjectsRepository.find({
        where: { student: { id: studentId } },
        relations: ['student'],
      });
      if (!subjects || subjects.length === 0) {
        throw new NotFoundException(`No subjects found for student with ID ${studentId}`);
      }
      return subjects;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch subjects for the student');
    }
  }

  async create(createSubjectDto: CreateSubjectDto): Promise<Subjects> {
    try {
      const student = await this.studentsRepository.findOne({
        where: { id: createSubjectDto.StudentID },
      });
      if (!student) {
        throw new NotFoundException('Student not found');
      }
      return await this.subjectsRepository.save(createSubjectDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create subject');
    }
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<void> {
    try {
      const updateResult = await this.subjectsRepository.update(id, updateSubjectDto);
      if (updateResult.affected === 0) {
        throw new NotFoundException(`Subject with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update subject');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const deleteResult = await this.subjectsRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new NotFoundException(`Subject with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete subject');
    }
  }
}
