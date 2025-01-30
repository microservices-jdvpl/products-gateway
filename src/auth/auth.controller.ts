import { Body, Controller, Inject, Post } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  create(@Body() body: any) {
    return this.client.send('auth.register.user', body);
  }
  @Post('login')
  login(@Body() body: any) {
    return this.client.send('auth.login.user', body);
  }
  @Post('verify')
  verify(@Body() body: any) {
    return this.client.send('auth.verify.user', body);
  }
}
