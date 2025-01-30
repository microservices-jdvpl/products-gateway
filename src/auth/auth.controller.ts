import { Body, Controller, Inject, Post } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  create(@Body() body: RegisterUserDto) {
    return this.client.send('auth.register.user', body);
  }
  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.client.send('auth.login.user', body);
  }
  @Post('verify')
  verify(@Body() body: any) {
    return this.client.send('auth.verify.user', body);
  }
}
