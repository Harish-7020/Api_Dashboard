import { Controller, Request, Post, UseGuards, Body, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    try {
      return await this.authService.login(req.user);
    } catch (error) {
      console.error('Login error:', error);
      throw new InternalServerErrorException('An error occurred while logging in');
    }
  }

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    try {
      // Validate input
      if (!body.username || !body.password) {
        throw new BadRequestException('Username and password are required');
      }
      return await this.authService.register(body.username, body.password);
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred while registering');
    }
  }
}
