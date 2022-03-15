import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../../database/entities/users/customer.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }
  async findOne(id: number) {
    const customer: Customer = await this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not Found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(payload);

    return this.customerRepo.save(newCustomer);
  }
  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOne(id);
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }
  delete(id: number) {
    return this.customerRepo.delete(id);
  }
}
