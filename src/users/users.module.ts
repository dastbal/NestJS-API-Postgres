import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { PizzasModule } from 'src/pizzas/pizzas.module';

import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderPizzaService } from './services/order-pizza.service';
import { OrderPizzaController } from './controllers/order-pizza.controller';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [PizzasModule],
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
    OrderPizzaController,
    ProfileController,
  ],
  providers: [UsersService, CustomersService, OrdersService, OrderPizzaService],
  exports: [UsersService],
})
export class UsersModule {}
