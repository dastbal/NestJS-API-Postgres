import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../database/entities/pizzas/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }
  async findOne(id: number) {
    const category = await this.categoryRepo.findOne(id, {
      relations: ['pizzas'],
    });
    if (!category) {
      throw new NotFoundException(`Category ${id} not Found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    const category = this.categoryRepo.create(payload);
    return this.categoryRepo.save(category);
  }
  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne(id);
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }
  delete(id: number) {
    return this.categoryRepo.delete(id);
  }
}
