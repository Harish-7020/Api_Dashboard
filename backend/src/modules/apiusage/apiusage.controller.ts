import { Controller, Get, Param } from '@nestjs/common';
import { ApiUsageService } from './apiusage.service';

@Controller('apiusage')
export class ApiUsageController {
  constructor(private readonly apiUsageService: ApiUsageService) {}

  @Get()
  async findAll() {
    return this.apiUsageService.findAll();
  }

}
