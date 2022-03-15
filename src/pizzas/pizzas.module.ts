import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzasController } from './controllers/pizzas.controller';
import { PizzasService } from './services/pizzas.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { IngredientsService } from './services/ingredients.service';
import { IngredientsController } from './controllers/ingredients.controller';


@Module({
  controllers: [PizzasController, CategoriesController, IngredientsController],
  providers: [PizzasService, CategoriesService, IngredientsService],
  exports: [PizzasService],
})
export class PizzasModule {}
