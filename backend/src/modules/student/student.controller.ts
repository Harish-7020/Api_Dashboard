// import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
// import { StudentsService } from './student.service';
// import { Students } from './entity/student.entity';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { ApiUsageService } from '../apiusage/apiusage.service'; // Import ApiUsageService

// @UseGuards(JwtAuthGuard)
// @Controller('students')
// export class StudentsController {
//   constructor(
//     private readonly studentsService: StudentsService,
//     private readonly apiUsageService: ApiUsageService, // Inject ApiUsageService
//   ) {}

//   @Get()
//   async findAll(@Request() req) {
//     const { userId } = req.user; // Extract userId from authenticated user
//     await this.apiUsageService.logApiUsage(userId, 'GET', '/students', new Date(), 'success', ''); // Log API usage
//     return this.studentsService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: number, @Request() req) {
//     const { userId } = req.user;
//     await this.apiUsageService.logApiUsage(userId, 'GET', `/students/${id}`, new Date(), 'success', '');
//     return this.studentsService.findOne(id);
//   }

//   @Post()
//   async create(@Body() student: Students, @Request() req) {
//     const { userId } = req.user;
//     await this.apiUsageService.logApiUsage(userId, 'POST', '/students', new Date(), 'success', '');
//     return this.studentsService.create(student);
//   }

//   @Put(':id')
//   async update(@Param('id') id: number, @Body() student: Students, @Request() req) {
//     const { userId } = req.user;
//     await this.apiUsageService.logApiUsage(userId, 'PUT', `/students/${id}`, new Date(), 'success', '');
//     return this.studentsService.update(id, student);
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: number, @Request() req) {
//     const { userId } = req.user;
//     await this.apiUsageService.logApiUsage(userId, 'DELETE', `/students/${id}`, new Date(), 'success', '');
//     return this.studentsService.remove(id);
//   }
// }


import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { StudentsService } from './student.service';
import { Students } from './entity/student.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiUsageService } from '../apiusage/apiusage.service'; // Import ApiUsageService

@UseGuards(JwtAuthGuard)
@Controller()
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly apiUsageService: ApiUsageService, // Inject ApiUsageService
  ) {}


  
  // Version 1: get Basic student details while accessing http://localhost:3000/v1/students



  @Get('v1/students')
  async findAllV1(@Request() req) {
    const { userId } = req.user; // Extract userId from authenticated user
    await this.apiUsageService.logApiUsage(userId, 'GET', '/v1/students', new Date(), 'success', ''); // Log API usage
    return this.studentsService.findAll();
  }

  @Get('v1/students/:id')
  async findOneV1(@Param('id') id: number, @Request() req) {
    const { userId } = req.user;
    await this.apiUsageService.logApiUsage(userId, 'GET', `/v1/students/${id}`, new Date(), 'success', '');
    return this.studentsService.findOne(id);
  }

  @Post('v1/students')
  async createV1(@Body() student: Students, @Request() req) {
    const { userId } = req.user;
    await this.apiUsageService.logApiUsage(userId, 'POST', '/v1/students', new Date(), 'success', '');
    return this.studentsService.create(student);
  }

  @Put('v1/students/:id')
  async updateV1(@Param('id') id: number, @Body() student: Students, @Request() req) {
    const { userId } = req.user;
    await this.apiUsageService.logApiUsage(userId, 'PUT', `/v1/students/${id}`, new Date(), 'success', '');
    return this.studentsService.update(id, student);
  }

  @Delete('v1/students/:id')
  async removeV1(@Param('id') id: number, @Request() req) {
    const { userId } = req.user;
    await this.apiUsageService.logApiUsage(userId, 'DELETE', `/v1/students/${id}`, new Date(), 'success', '');
    return this.studentsService.remove(id);
  }


  // Version 2: get Basic student details with subject details while accessing http://localhost:3000/v2/students 


  @Get('v2/students')
  async findAllV2(@Request() req) {
    const { userId } = req.user;
    await this.apiUsageService.logApiUsage(userId, 'GET', '/v2/students', new Date(), 'success', '');
    return this.studentsService.findAllWithSubjects();
  }

  @Get('v2/students/:id')
  async findOneV2(@Param('id') id: number, @Request() req) {
    const { userId } = req.user;
    await this.apiUsageService.logApiUsage(userId, 'GET', `/v2/students/${id}`, new Date(), 'success', '');
    return this.studentsService.findOneWithSubjects(id);
  }
}
