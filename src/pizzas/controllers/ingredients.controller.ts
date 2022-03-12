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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateIngredientDto, UpdateIngredientDto } from '../dtos/ingredient.dtos';
import { IngredientsService } from '../services/ingredients.service';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}
  @Get(':ingredientId')
  @ApiOperation({ summary: 'get a Ingredient by id' })
  getCategory(@Param('ingredientId', ParseIntPipe) ingredientId: number) {
    return this.ingredientsService.findOne(ingredientId);
  }

  @Get()
  getCategories(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    return this.ingredientsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreateIngredientDto) {
    return this.ingredientsService.create(payload);
  }
  @Put(':ingredientId')
  update(
    @Param('ingredientId', ParseIntPipe) ingredientId: number,
    @Body() payload: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(ingredientId, payload);
  }
  @Delete(':ingredientId')
  delete(@Param('ingredientId', ParseIntPipe) ingredientId: number) {
    return this.ingredientsService.delete(ingredientId);
  }
}
