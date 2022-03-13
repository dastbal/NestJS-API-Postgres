import {
  Controller,
  HttpCode,
  HttpStatus,
  Delete,
  Put,
  Get,
  Query,
  Param,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dtos';
import { OrdersService } from '../services/orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}
  @Get(':orderId')
  getOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.ordersService.findOne(orderId);
  }

  @Get()
  getOrders(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    return this.ordersService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }
  @Put(':orderId')
  update(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.ordersService.update(orderId, payload);
  }
  @Delete(':orderId')
  delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.ordersService.delete(orderId);
  }
}
