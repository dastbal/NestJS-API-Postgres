import { Injectable, NotFoundException } from '@nestjs/common';
import { Pizza } from '../entities/pizza.entity';
import {
  CreatePizzaDto,
  FilterPizzaDto,
  UpdatePizzaDto,
} from 'src/pizzas/dtos/pizzas.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindCondition, FindConditions, Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Ingredient } from '../entities/ingredient.entity';
import { Category } from '../entities/category.entity';
import { number } from 'joi';

@Injectable()
export class PizzasService {
  constructor(
    @InjectRepository(Pizza) private pizzaRepo: Repository<Pizza>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Ingredient)
    private ingredientRepo: Repository<Ingredient>,
    private categoryService: CategoriesService, // private ingredientsService: IngredientsService,
  ) {}

  findAll(params?: FilterPizzaDto) {
    const { limit, offset, category, maxPrice, minPrice } = params;
    const where: FindConditions<Pizza> = {};
    if (params) {
      if (category) {
        return this.pizzaRepo.find({
          relations: ['category'],
          take: limit,
          skip: offset,
          where: {
            category,
          },
        });
      }
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.pizzaRepo.find({
        relations: ['category'],
        take: limit,
        skip: offset,
        where,
      });
    }

    return this.pizzaRepo.find({
      relations: ['category'],
    });
  }
  async findOne(id: number) {
    const pizza = await this.pizzaRepo.findOne(id, {
      relations: ['category', 'ingredients'],
    });
    if (!pizza) {
      throw new NotFoundException(`Pizza ${id} not Found`);
    }
    return pizza;
  }

  async create(payload: CreatePizzaDto) {
    const newPizza = this.pizzaRepo.create(payload);
    if (payload.categoryId) {
      const category = await this.categoryRepo.findOne(payload.categoryId);
      newPizza.category = category;
    }
    // if (payload.ingredientsId) {
    //   payload.ingredientsId.forEach(async (ingredientId) => {
    //     const ingredient = await this.ingredientsService.findOne(ingredientId);
    //     newPizza.ingredients.push(ingredient);
    //   });
    // }
    if (payload.ingredientsId) {
      const ingredients = await this.ingredientRepo.findByIds(
        payload.ingredientsId,
      );
      newPizza.ingredients = ingredients;
    }

    return this.pizzaRepo.save(newPizza);
  }
  async update(id: number, changes: UpdatePizzaDto) {
    const pizza = await this.pizzaRepo.findOne(id);
    if (changes.categoryId) {
      pizza.category = await this.categoryRepo.findOne(changes.categoryId);
    }
    if (changes.ingredientsId) {
      pizza.ingredients = await this.ingredientRepo.findByIds(
        changes.ingredientsId,
      );
    }

    this.pizzaRepo.merge(pizza, changes);
    return this.pizzaRepo.save(pizza);
  }

  async removeIngredientFromPizza(ingredientId: number, pizzaId: number) {
    const pizza = await this.pizzaRepo.findOne(pizzaId, {
      relations: ['ingredients'],
    });
    pizza.ingredients = pizza.ingredients.filter(
      (ingredient) => ingredient.id !== ingredientId,
    );
    return this.pizzaRepo.save(pizza);
  }
  async AddIngredientToPizza(ingredientId: number, pizzaId: number) {
    const pizza = await this.pizzaRepo.findOne(pizzaId, {
      relations: ['ingredients'],
    });
    const ingredient = await this.ingredientRepo.findOne(ingredientId);
    pizza.ingredients.push(ingredient);
    return this.pizzaRepo.save(pizza);
  }
  delete(id: number) {
    return this.pizzaRepo.delete(id);
  }
}
