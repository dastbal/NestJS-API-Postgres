/* eslint-disable prettier/prettier */
import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 import
import { Category } from 'src/database/entities/pizzas/category.entity';
import { Customer } from 'src/database/entities/users/customer.entity';
import { OrderPizza } from 'src/database/entities/users/order-pizza.entity';
import { Order } from 'src/database/entities/users/order.entity';
import { User } from 'src/database/entities/users/user.entity';
import { Ingredient } from './entities/pizzas/ingredient.entity';
import { Pizza } from './entities/pizzas/pizza.entity';


const API_KEY = '1234';
const API_KEY_PROD = 'PROD1234';

// client.query('SELECT * FROM tasks', (e, r) => {
//   console.log(e);
//   console.log(r.rows);
// });

@Global()
@Module({
  imports:[
    TypeOrmModule.forRootAsync({ // 👈 use TypeOrmModule
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          // entities: ['src/**/*.entity.ts'],
          url: configService.postgresUrl,
          synchronize: false,
          autoLoadEntities:true,
          // ssl:{
          //   rejectUnauthorized:false,
          // },
        };
      },
    }),
    TypeOrmModule.forFeature([
      Pizza,
      Ingredient,
      Category,
      Customer,
      OrderPizza,
      Order,
      User,
    ]),
  ],

  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const client = new Client({
          connectionString : configService.postgresUrl,
          // ssl:{
          //   rejectUnauthorized:false,
          // },
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG' ,TypeOrmModule],
})
export class DatabaseModule {}
