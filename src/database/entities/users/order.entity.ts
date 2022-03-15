import { Exclude, Expose } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Entity,
  OneToMany,
} from 'typeorm';
import { Customer } from './customer.entity';
import { OrderPizza } from './order-pizza.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;
  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderPizza, (orderPizza) => orderPizza.order)
  pizzas: OrderPizza[];

  // @Expose()
  // get pizzasExpose() {
  //   if (this.pizzas) {
  //     return this.pizzas.filter((pizza) => !!pizza)
  //     .map((pizza)=> ({
  //       ...pizza.pizza,
  //       quantity : pizza.quantity

  //     }))
  //   }
  //   return [];
  // }

  @Expose()
  get total() {
    if (this.pizzas) {
      return this.pizzas
        .filter((item) => !!item)
        .reduce((total, item) => {
          const totalPriceItem = item.pizza.price * item.quantity;
          return total + totalPriceItem;
        }, 0);
    }
    return 0;
  }
}
