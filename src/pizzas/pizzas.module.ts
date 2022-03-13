import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzasController } from './controllers/pizzas.controller';
import { PizzasService } from './services/pizzas.service';
import { Pizza } from './entities/pizza.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';
import { IngredientsService } from './services/ingredients.service';
import { IngredientsController } from './controllers/ingredients.controller';
import { Ingredient } from './entities/ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pizza, Category, Ingredient])],
  controllers: [PizzasController, CategoriesController, IngredientsController],
  providers: [PizzasService, CategoriesService, IngredientsService],
  exports: [PizzasService, TypeOrmModule],
})
export class PizzasModule {}
