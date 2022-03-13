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
import { CreateOrderPizzaDto } from '../dtos/order-pizza.dtos';
import { OrderPizzaService } from '../services/order-pizza.service';

@ApiTags('order-pizza')
@Controller('order-pizza')
export class OrderPizzaController {
  constructor(private orderPizzaService: OrderPizzaService) {}

  @Post()
  create(@Body() payload: CreateOrderPizzaDto) {
    return this.orderPizzaService.create(payload);
  }
}
