import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { SubjectsService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiUsageService } from '../apiusage/apiusage.service';

@Controller('subjects')
@UseGuards(JwtAuthGuard)
export class SubjectsController {
  constructor(
    private readonly subjectsService: SubjectsService,
    private readonly apiUsageService: ApiUsageService, // Inject ApiUsageService
  ) {}

  @Get()
  async findAll(@Request() req) {
    const { userId } = req.user;
    try {
      const subjects = await this.subjectsService.findAll();
      await this.apiUsageService.logApiUsage(userId, 'GET', '/subjects', new Date(), 'success', '');
      return subjects;
    } catch (error) {
      await this.apiUsageService.logApiUsage(userId, 'GET', '/subjects', new Date(), 'error', error.message);
      throw new InternalServerErrorException('Failed to fetch subjects');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req) {
    const { userId } = req.user;
    try {
      const subject = await this.subjectsService.findOne(id);
      if (!subject) {
        throw new NotFoundException(`Subject with ID ${id} not found`);
      }
      await this.apiUsageService.logApiUsage(userId, 'GET', `/subjects/${id}`, new Date(), 'success', '');
      return subject;
    } catch (error) {
      await this.apiUsageService.logApiUsage(userId, 'GET', `/subjects/${id}`, new Date(), 'error', error.message);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch the subject');
    }
  }

  @Get('student/:studentId')
  async findByStudentId(@Param('studentId') studentId: number, @Request() req) {
    const { userId } = req.user;
    try {
      const subjects = await this.subjectsService.findByStudentId(studentId);
      if (!subjects || subjects.length === 0) {
        throw new NotFoundException(`No subjects found for student with ID ${studentId}`);
      }
      await this.apiUsageService.logApiUsage(userId, 'GET', `/students/${studentId}`, new Date(), 'success', '');
      return subjects;
    } catch (error) {
      await this.apiUsageService.logApiUsage(userId, 'GET', `/students/${studentId}`, new Date(), 'error', error.message);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch subjects for the student');
    }
  }

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto, @Request() req) {
    const { userId } = req.user;
    try {
      const createdSubject = await this.subjectsService.create(createSubjectDto);
      await this.apiUsageService.logApiUsage(userId, 'POST', '/subjects', new Date(), 'success', '');
      return createdSubject;
    } catch (error) {
      await this.apiUsageService.logApiUsage(userId, 'POST', '/subjects', new Date(), 'error', error.message);
      throw new BadRequestException('Failed to create subject');
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateSubjectDto: UpdateSubjectDto, @Request() req) {
    const { userId } = req.user;
    try {
      const updateResult = await this.subjectsService.update(id, updateSubjectDto);
      await this.apiUsageService.logApiUsage(userId, 'PUT', `/subjects/${id}`, new Date(), 'success', '');
      return updateResult;
    } catch (error) {
      await this.apiUsageService.logApiUsage(userId, 'PUT', `/subjects/${id}`, new Date(), 'error', error.message);
      throw new BadRequestException('Failed to update subject');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const { userId } = req.user;
    try {
      const deleteResult = await this.subjectsService.remove(id);
      await this.apiUsageService.logApiUsage(userId, 'DELETE', `/subjects/${id}`, new Date(), 'success', '');
      return deleteResult;
    } catch (error) {
      await this.apiUsageService.logApiUsage(userId, 'DELETE', `/subjects/${id}`, new Date(), 'error', error.message);
      throw new InternalServerErrorException('Failed to delete subject');
    }
  }
}
