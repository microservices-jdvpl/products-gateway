import { Body, Controller, Inject, Post } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { catchError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  create(@Body() body: RegisterUserDto) {
    return this.client.send('auth.register.user', body).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
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
