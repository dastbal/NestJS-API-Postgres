import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Ingredient } from './ingredient.entity';

@Entity({ name: 'pizzas' })
export class Pizza {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;
  @Column({ type: 'text' })
  description: string;

  @Index()
  @Column({ type: 'int' })
  price: number;
  @Column({ type: 'varchar', length: 255 })
  image: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Category, (category) => category.pizzas)
  @JoinColumn({ name: 'category_id' }) // esta maneja la referencia solo un lado debe tener el decorador
  category: Category;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.pizzas)
  @JoinTable({
    name: 'pizzas_ingredients',
    joinColumn: {
      name: 'pizza_id',
    },
    inverseJoinColumn: {
      name: 'ingredient_id',
    },
  })
  ingredients: Ingredient[];
}
