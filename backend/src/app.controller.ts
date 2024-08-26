import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    try {
      return this.appService.getHello();
    } catch (error) {
      console.error('Error in getHello method:', error);
      throw new InternalServerErrorException('An error occurred while fetching the message');
    }
  }
}
