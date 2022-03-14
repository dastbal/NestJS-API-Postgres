import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';

import * as bcrypt from 'bcrypt';
import { PizzasService } from 'src/pizzas/services/pizzas.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private pizzaService: PizzasService,
    private customersService: CustomersService,
  ) {}

  findAll() {
    return this.userRepo.find({
      relations: ['customer'],
    });
  }
  async findOne(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not Found`);
    }
    return user;
  }

  async create(payload: CreateUserDto) {
    const newUser = this.userRepo.create(payload);
    const hashPassword = await bcrypt.hash(payload.password, 12);
    newUser.password = hashPassword;
    if (payload.customerId) {
      const customer = await this.customersService.findOne(payload.customerId);
      newUser.customer = customer;
    }

    return this.userRepo.save(newUser);
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    return user;
  }
  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne(id);
    const password = await bcrypt.hash(changes.password, 12);
    const newChanges = { ...changes, password };
    this.userRepo.merge(user, newChanges);
    return this.userRepo.save(user);
  }
  delete(id: number) {
    return this.userRepo.delete(id);
  }
  // async getOrderByUser(id: number): Order {
  //   const user: User = this.findOne(id);
  //   return {
  //     date: new Date(),
  //     user,
  //     pizzas: await this.pizzaService.findAll(),
  //   };
  // }
}
