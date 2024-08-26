import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    // Extract the JWT from the authorization header
    const authHeader = request.headers['authorization'];
    let userId: string | null = null;
    let isAuthenticated = false;

    if (authHeader) {
      try {
        const token = authHeader.split(' ')[1];
        const decodedToken = this.jwtService.decode(token) as { sub: string };
        userId = decodedToken?.sub || null;
        isAuthenticated = !!userId;
      } catch (error) {
        console.error('Failed to decode JWT:', error);
      }
    }

    return next.handle().pipe(
      tap((response) => {
        if (isAuthenticated) {
          console.log(
            `${method} ${url} - ${Date.now() - now}ms - User: ${userId}`
          );
        }
      })
    );
  }
}
