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
  UseGuards,
} from '@nestjs/common';
import { PizzasService } from 'src/pizzas/services/pizzas.service';
import {
  CreatePizzaDto,
  FilterPizzaDto,
  UpdatePizzaDto,
} from 'src/pizzas/dtos/pizzas.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Pizzas')
@Controller('pizzas')
export class PizzasController {
  constructor(private pizzasService: PizzasService) {}
  @Public()
  @Get(':pizzaId')
  @ApiOperation({ summary: 'get a pizza by id' })
  getPizza(@Param('pizzaId', ParseIntPipe) pizzaId: number) {
    return this.pizzasService.findOne(pizzaId);
  }

  @Public()
  @Get()
  getPizzas(@Query() params?: FilterPizzaDto) {
    return this.pizzasService.findAll(params);
  }

  @Roles(Role.ADMIN)
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreatePizzaDto) {
    return this.pizzasService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':pizzaId')
  update(
    @Param('pizzaId', ParseIntPipe) pizzaId: number,
    @Body() payload: UpdatePizzaDto,
  ) {
    return this.pizzasService.update(pizzaId, payload);
  }

  @Roles(Role.ADMIN)
  @Put(':pizzaId/ingredient/:ingredientId')
  @ApiOperation({ summary: 'adding ingredients to a pizza' })
  updateIngredient(
    @Param('pizzaId', ParseIntPipe) pizzaId: number,
    @Param('ingredientId', ParseIntPipe) ingredientId: number,
  ) {
    return this.pizzasService.AddIngredientToPizza(ingredientId, pizzaId);
  }
  @Roles(Role.ADMIN)
  @Delete(':pizzaId')
  delete(@Param('pizzaId', ParseIntPipe) pizzaId: number) {
    return this.pizzasService.delete(pizzaId);
  }

  @Roles(Role.ADMIN)
  @Delete(':pizzaId/ingredient/:ingredientId')
  @ApiOperation({ summary: 'removing ingredients from a pizza' })
  deleteIngredient(
    @Param('pizzaId', ParseIntPipe) pizzaId: number,
    @Param('ingredientId', ParseIntPipe) ingredientId: number,
  ) {
    return this.pizzasService.removeIngredientFromPizza(ingredientId, pizzaId);
  }
}
