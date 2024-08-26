import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { StudentsService } from './student.service';
import { Students } from './entity/student.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiUsageService } from '../apiusage/apiusage.service';

@UseGuards(JwtAuthGuard)
@Controller()
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly apiUsageService: ApiUsageService,
  ) {}

 // Version 1: get Basic student details while accessing http://localhost:3000/v1/students

  @Get('v1/students')
  async findAllV1(@Request() req) {
    const { userId } = req.user;
    try {
      const students = await this.studentsService.findAll();
      await this.apiUsageService.logApiUsage(userId, 'GET', '/v1/students', new Date(), 'success', '');
      return students;
    } catch (error) {
      await this.apiUsageService.logApiUsage(userId, 'GET', '/v1/students', new Date(), 'error', error.message);
      throw new InternalServerErrorException('Failed to fetch students');
    }
  }

  @Get('v1/students/:id')
  async findOneV1(@Param('id') id: number, @Request() req) {
    const { userId } = req.user;
    try {
      const student = await this.studentsService.findOne(id);
      if (!student) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
      await this.apiUsageService.logApiUsage(userId, 'GET', `/v1/students/${id}`, new Date(), 'success', '');
      return student;
    } catch (error) {
      await this.apiUsageService.logApiUsage(userId, 'GET', `/v1/students/${id}`, new Date(), 'error', error.message);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch the student');
    }
  }

  @Post('v1/students')
  async createV1(@Body() student: Students, @Request() req) {
    const { userId } = req.user;
    try {
      const createdStudent = await this.studentsService.create(student);
      await this.apiUsageService.logApiUsage(userId, 'POST', '/v1/students', new Date(), 'success', '');
      return createdStudent;
    } catch (error) {
      await this.apiUsageService.logApiUsage(userId, 'POST', '/v1/students', new Date(), 'error', error.message);
      throw new BadRequestException('Failed to create student');
    }
  }

  @Put('v1/students/:id')
  async updateV1(@Param('id') id: number, @Body() student: Students, @Request() req) {
    const { userId } = req.user;
    try {
      const updatedStudent = await this.studentsService.update(id, student);
      await this.apiUsageService.logApiUsage(userId, 'PUT', `/v1/students/${id}`, new Date(), 'success', '');
      return updatedStudent;
    } catch (error) {
      await this.apiUsageService.logApiUsage(userId, 'PUT', `/v1/students/${id}`, new Date(), 'error', error.message);
      throw new BadRequestException('Failed to update student');
    }
  }

  @Delete('v1/students/:id')
  async removeV1(@Param('id') id: number, @Request() req) {
    const { userId } = req.user;
    try {
      await this.studentsService.remove(id);
      await this.apiUsageService.logApiUsage(userId, 'DELETE', `/v1/students/${id}`, new Date(), 'success', '');
    } catch (error) {
      await this.apiUsageService.logApiUsage(userId, 'DELETE', `/v1/students/${id}`, new Date(), 'error', error.message);
      throw new InternalServerErrorException('Failed to delete student');
    }
  }


  // Version 2: get Basic student details with subject details while accessing http://localhost:3000/v2/students 


  @Get('v2/students')
  async findAllV2(@Request() req) {
    const { userId } = req.user;
    try {
      const students = await this.studentsService.findAllWithSubjects();
      await this.apiUsageService.logApiUsage(userId, 'GET', '/v2/students', new Date(), 'success', '');
      return students;
    } catch (error) {
      await this.apiUsageService.logApiUsage(userId, 'GET', '/v2/students', new Date(), 'error', error.message);
      throw new InternalServerErrorException('Failed to fetch students with subjects');
    }
  }

  @Get('v2/students/:id')
  async findOneV2(@Param('id') id: number, @Request() req) {
    const { userId } = req.user;
    try {
      const student = await this.studentsService.findOneWithSubjects(id);
      if (!student) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
      await this.apiUsageService.logApiUsage(userId, 'GET', `/v2/students/${id}`, new Date(), 'success', '');
      return student;
    } catch (error) {
      await this.apiUsageService.logApiUsage(userId, 'GET', `/v2/students/${id}`, new Date(), 'error', error.message);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch the student with subjects');
    }
  }
}
