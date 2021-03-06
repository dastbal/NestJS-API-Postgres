import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from 'src/database/entities/pizzas/ingredient.entity';
import { Repository } from 'typeorm';
import {
  CreateIngredientDto,
  UpdateIngredientDto,
} from '../dtos/ingredient.dtos';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepo: Repository<Ingredient>,
  ) {}

  findAll() {
    return this.ingredientRepo.find();
  }
  async findOne(id: number) {
    const ingredient = await this.ingredientRepo.findOne(id);
    if (!ingredient) {
      throw new NotFoundException(`Ingredient ${id} not Found`);
    }
    return ingredient;
  }

  create(payload: CreateIngredientDto) {
    const ingredient = this.ingredientRepo.create(payload);
    return this.ingredientRepo.save(ingredient);
  }
  async update(id: number, changes: UpdateIngredientDto) {
    const ingredient = await this.ingredientRepo.findOne(id);
    this.ingredientRepo.merge(ingredient, changes);
    return this.ingredientRepo.save(ingredient);
  }
  delete(id: number) {
    return this.ingredientRepo.delete(id);
  }
}
