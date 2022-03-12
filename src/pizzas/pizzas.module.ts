import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzasController } from './controllers/pizzas.controller';
import { PizzasService } from './services/pizzas.service';
import { Pizza } from './entities/pizza.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pizza, Category])],
  controllers: [PizzasController, CategoriesController],
  providers: [PizzasService, CategoriesService],
  exports: [PizzasService],
})
export class PizzasModule {}
