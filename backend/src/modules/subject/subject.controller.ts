import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request, Req} from '@nestjs/common';
import { SubjectsService } from './subject.service';
import { Subjects } from './entity/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiUsageService } from '../apiusage/apiusage.service';

@Controller('subjects')
@UseGuards(JwtAuthGuard)
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService,
  private readonly apiUsageService: ApiUsageService, // Inject ApiUsageService

  ) {}

  @Get()
  async findAll(@Request() req) {
    const { userId } = req.user; // Extract userId from authenticated user
    await this.apiUsageService.logApiUsage(userId, 'GET', '/subjects', new Date(), 'success', ''); // Log API usage    
    return this.subjectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req) {
    const { userId } = req.user;
    await this.apiUsageService.logApiUsage(userId, 'GET', `/subjects/${id}`, new Date(), 'success', '');
    return this.subjectsService.findOne(id);
  }

  @Get('student/:studentId')
  async findByStudentId(@Param('studentId') studentId: number, @Request() req) {
    const {userId} = req.user;
    await this.apiUsageService.logApiUsage(userId, 'GET', '/students', new Date(), 'success', '');
    return this.subjectsService.findByStudentId(studentId);
  }
  
  @Post()
  async create(@Body() createSubjectDto : CreateSubjectDto, @Request() req) {
    const { userId } = req.user;
    await this.apiUsageService.logApiUsage(userId, 'POST', '/subjects', new Date(), 'success', '');  
    return this.subjectsService.create(createSubjectDto);
  }
  
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateSubjectDto :UpdateSubjectDto, @Request() req) {
    const {UserId} = req.user;
    await this.apiUsageService.logApiUsage(UserId, 'PUT', '/subjects', new Date(), 'success', '');
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const {userId} = req.user;
    await this.apiUsageService.logApiUsage(userId, 'DELETE', '/subjects', new Date(), 'success','')
    return this.subjectsService.remove(id);
  }
}

