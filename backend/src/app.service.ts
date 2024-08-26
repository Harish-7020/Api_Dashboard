import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    try {
      return 'Navigate to this localhost to check out my Dashboard: http://localhost:3001/api-usage';
    } catch (error) {
      console.error('Error in getHello method:', error);
      throw new Error('An error occurred while fetching the message');
    }
  }
}
