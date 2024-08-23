import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './monitoring/logging.interceptor';
import * as compression from 'compression';
import { VersioningType } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Compress API payloads and responses
  // added a compressor to compress the payloads and responses

  app.use(compression({
    filter: () => { return true },
    threshold: 0
  })); 

  // API Versioning 
  // added to versions for the students endpoints

  app.enableVersioning({
    type: VersioningType.URI, 
  });

  const jwtService = app.get(JwtService);

  app.useWebSocketAdapter(new IoAdapter(app));
  
  app.useGlobalInterceptors(new LoggingInterceptor(jwtService));

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
