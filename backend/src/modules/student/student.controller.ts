import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { StudentsService } from './student.service';
import { Students } from './entity/student.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiUsageService } from '../apiusage/apiusage.service'; // Import ApiUsageService

@UseGuards(JwtAuthGuard)
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly apiUsageService: ApiUsageService, // Inject ApiUsageService
  ) {}

  @Get()
  async findAll(@Request() req) {
    const { userId } = req.user; // Extract userId from authenticated user
    await this.apiUsageService.logApiUsage(userId, 'GET', '/students', new Date(), 'success', ''); // Log API usage
    return this.studentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req) {
    const { userId } = req.user;
    await this.apiUsageService.logApiUsage(userId, 'GET', `/students/${id}`, new Date(), 'success', '');
    return this.studentsService.findOne(id);
  }

  @Post()
  async create(@Body() student: Students, @Request() req) {
    const { userId } = req.user;
    await this.apiUsageService.logApiUsage(userId, 'POST', '/students', new Date(), 'success', '');
    return this.studentsService.create(student);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() student: Students, @Request() req) {
    const { userId } = req.user;
    await this.apiUsageService.logApiUsage(userId, 'PUT', `/students/${id}`, new Date(), 'success', '');
    return this.studentsService.update(id, student);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const { userId } = req.user;
    await this.apiUsageService.logApiUsage(userId, 'DELETE', `/students/${id}`, new Date(), 'success', '');
    return this.studentsService.remove(id);
  }
}
