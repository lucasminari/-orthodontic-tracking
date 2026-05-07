import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    const user = await this.authService.validateUser(credentials.email, credentials.password);
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }
    // TODO: gerar JWT token
    return { success: true, user };
  }

  @Get('users/:userId')
  async getUser(@Param('userId') userId: string) {
    return await this.authService.getUserById(userId);
  }
}
