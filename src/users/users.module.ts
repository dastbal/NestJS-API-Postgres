import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { PizzasModule } from 'src/pizzas/pizzas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { Order } from './entities/order.entity';
import { OrderPizza } from './entities/order-pizza.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderPizzaService } from './services/order-pizza.service';
import { OrderPizzaController } from './controllers/order-pizza.controller';

@Module({
  imports: [
    PizzasModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderPizza]),
  ],
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
    OrderPizzaController,
  ],
  providers: [UsersService, CustomersService, OrdersService, OrderPizzaService],
})
export class UsersModule {}
