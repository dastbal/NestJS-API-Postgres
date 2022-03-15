import { Exclude } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  ManyToOne,
  Column,

} from 'typeorm';
import { Pizza } from '../pizzas/pizza.entity';
import { Order } from './order.entity';

@Entity()
export class OrderPizza {
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

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Pizza)
  pizza: Pizza;
  @ManyToOne(() => Order, (order) => order.pizzas)
  order: Order;

}
