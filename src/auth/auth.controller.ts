import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthLoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign_up')
  signUp(@Body() payload: AuthDto) {
    return this.authService.signUp(payload);
  }

  @Post('login')
  login(@Body() payload: AuthLoginDto) {
    return this.authService.login(payload);
  }
}
