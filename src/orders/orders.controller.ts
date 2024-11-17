import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  ParseEnumPipe,
} from '@nestjs/common';
import { ORDERS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { OrderStatus } from './enum/order.enum';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get(':status')
  findAll(
    @Param('status', new ParseEnumPipe(OrderStatus)) status: OrderStatus,
    @Query() query: PaginationDto,
  ) {
    return this.ordersClient.send('findAllOrders', { status, ...query });
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('findOneOrder', id).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
