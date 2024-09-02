import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { NotificationService } from './notification.service'; // Import your NotificationService
  
  @Catch()
  @Injectable()
  export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly notificationService: NotificationService) {}
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : exception;
  
      // Log the error
      console.error('Error caught by AllExceptionsFilter:', message);
  
      // Send a notification about the error
      this.notificationService.sendAlert('Error occurred', message as string);
  
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
    }
  }
  