import { Injectable, NotFoundException } from '@nestjs/common';
import { Pizza } from '../entities/pizza.entity';
import { CreatePizzaDto, UpdatePizzaDto } from 'src/pizzas/dtos/pizzas.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';

@Injectable()
export class PizzasService {
  constructor(
    @InjectRepository(Pizza) private pizzaRepo: Repository<Pizza>,
    private categoryService: CategoriesService,
  ) {}
  // private counterPizzaId: number = 1;
  // private pizzas: Pizza[] = [
  //   {
  //     id: 1,
  //     name: 'Jamon',
  //     description: 'Delicous pizza',
  //     price: 10,
  //     image: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
  //   },
  // ];

  findAll() {
    return this.pizzaRepo.find({
      relations: ['category'],
    });
  }
  async findOne(id: number) {
    const pizza = await this.pizzaRepo.findOne(id);
    if (!pizza) {
      throw new NotFoundException(`Pizza ${id} not Found`);
    }
    return pizza;
  }

  async create(payload: CreatePizzaDto) {
    const newPizza = this.pizzaRepo.create(payload);
    if (payload.categoryId) {
      const category = await this.categoryService.findOne(payload.categoryId);
      newPizza.category = category;
    }

    return this.pizzaRepo.save(newPizza);
  }
  async update(id: number, changes: UpdatePizzaDto) {
    const pizza = await this.pizzaRepo.findOne(id);
    this.pizzaRepo.merge(pizza, changes);

    return this.pizzaRepo.save(pizza);
  }
  delete(id: number) {
    return this.pizzaRepo.delete(id);
  }
}
