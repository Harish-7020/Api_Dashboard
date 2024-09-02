import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './monitoring/logging.interceptor';
import * as compression from 'compression';
import { VersioningType, INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AllExceptionsFilter } from './modules/filters/all-exceptions.filter';
import { NotificationService } from './modules/filters/notification.service'; // Import your NotificationService

async function bootstrap() {
  const app = await NestFactory.create<INestApplication>(AppModule);

  // Compress API payloads and responses
  app.use(compression({
    filter: () => true,
    threshold: 0,
  }));

  // API Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // WebSocket Adapter
  app.useWebSocketAdapter(new IoAdapter(app));

  // Exception Filter
  const notificationService = app.get(NotificationService);
  app.useGlobalFilters(new AllExceptionsFilter(notificationService));

  // Logging Interceptor
  const jwtService = app.get(JwtService);
  app.useGlobalInterceptors(new LoggingInterceptor(jwtService));

  // CORS Configuration
  app.enableCors();

  await app.listen(3000);
}

bootstrap();
