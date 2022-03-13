import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from 'src/pizzas/entities/pizza.entity';
import { Repository } from 'typeorm';
import { CreateOrderPizzaDto } from '../dtos/order-pizza.dtos';
import { OrderPizza } from '../entities/order-pizza.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderPizzaService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Pizza) private pizzaRepo: Repository<Pizza>,
    @InjectRepository(OrderPizza)
    private orderPizzaRepo: Repository<OrderPizza>,
  ) {}

  async create(data: CreateOrderPizzaDto) {
    const order = await this.orderRepo.findOne(data.orderId);
    const pizza = await this.pizzaRepo.findOne(data.pizzaId);
    const item = new OrderPizza();
    item.pizza = pizza;
    item.order = order;
    item.quantity = data.quantity;
    return  this.orderPizzaRepo.save(item);
  }
//   async update(data: CreateOrderPizzaDto) {
//     const order = await this.orderRepo.findOne(data.orderId);
//     const pizza = await this.pizzaRepo.findOne(data.pizzaId);
//     const item = new OrderPizza();
//     item.pizza = pizza;
//     item.order = order;
//     item.quantity = data.quantity;
//     return  this.orderPizzaRepo.save(item);
//   }
}
