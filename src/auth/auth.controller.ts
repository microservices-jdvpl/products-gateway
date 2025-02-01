import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { CurrentUser } from './interface/current-user.iinterface';
import { Token } from './decorators/token.decorator';

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
    return this.client.send('auth.login.user', body).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Post('verify')
  verify(@User() user: CurrentUser, @Token() token: string) {
    // return this.client.send('auth.verify.user', body).pipe(
    //   catchError((error) => {
    //     throw new RpcException(error);
    //   }),
    // );
    return { user, token };
  }
}
