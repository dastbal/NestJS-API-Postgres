import {
  Controller,
  HttpCode,
  HttpStatus,
  Delete,
  Put,
  Get,
  Query,
  Param,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PizzasService } from 'src/pizzas/services/pizzas.service';
import { CreatePizzaDto, FilterPizzaDto, UpdatePizzaDto } from 'src/pizzas/dtos/pizzas.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Pizzas')
@Controller('pizzas')
export class PizzasController {
  constructor(private pizzasService: PizzasService) {}
  @Get(':pizzaId')
  @ApiOperation({ summary: 'get a pizza by id' })
  getPizza(@Param('pizzaId', ParseIntPipe) pizzaId: number) {
    return this.pizzasService.findOne(pizzaId);
  }

  @Get()
  getPizzas(@Query() params?: FilterPizzaDto) {
    return this.pizzasService.findAll(params);
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreatePizzaDto) {
    return this.pizzasService.create(payload);
  }
  @Put(':pizzaId')
  update(
    @Param('pizzaId', ParseIntPipe) pizzaId: number,
    @Body() payload: UpdatePizzaDto,
  ) {
    return this.pizzasService.update(pizzaId, payload);
  }
  @Put(':pizzaId/ingredient/:ingredientId')
  @ApiOperation({ summary: 'adding ingredients to a pizza' })
  updateIngredient(
    @Param('pizzaId', ParseIntPipe) pizzaId: number,
    @Param('ingredientId', ParseIntPipe) ingredientId: number,
  ) {
    return this.pizzasService.AddIngredientToPizza(ingredientId, pizzaId);
  }
  @Delete(':pizzaId')
  delete(@Param('pizzaId', ParseIntPipe) pizzaId: number) {
    return this.pizzasService.delete(pizzaId);
  }
  @Delete(':pizzaId/ingredient/:ingredientId')
  @ApiOperation({ summary: 'removing ingredients from a pizza' })
  deleteIngredient(
    @Param('pizzaId', ParseIntPipe) pizzaId: number,
    @Param('ingredientId', ParseIntPipe) ingredientId: number,
  ) {
    return this.pizzasService.removeIngredientFromPizza(ingredientId, pizzaId);
  }
}
