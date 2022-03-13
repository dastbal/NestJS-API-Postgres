import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dtos';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}
  findAll() {
    return this.orderRepo.find();
  }


  async findOne(id: number) {
    const order = await this.orderRepo.findOne(id, {
      relations: ['pizzas','pizzas.pizza'],
    });
    if (!order) {
      throw new NotFoundException(`Order ${id} not Found`);
    }
    return order;
  }

  async create(payload: CreateOrderDto) {
    const neworder = new Order();
    const customer = await this.customerRepo.findOne(payload.customerId);
    neworder.customer = customer;

    return this.orderRepo.save(neworder);
  }
  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne(id);
    if (changes.customerId) {
      order.customer = await this.customerRepo.findOne(changes.customerId);
    }
    return this.orderRepo.save(order);
  }
  delete(id: number) {
    return this.orderRepo.delete(id);
  }
}
