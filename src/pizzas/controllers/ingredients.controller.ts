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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/roles.model';
import {
  CreateIngredientDto,
  UpdateIngredientDto,
} from '../dtos/ingredient.dtos';
import { IngredientsService } from '../services/ingredients.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private ingredientsService: IngredientsService) {}
  @Public()
  @Get(':ingredientId')
  @ApiOperation({ summary: 'get a Ingredient by id' })
  getCategory(@Param('ingredientId', ParseIntPipe) ingredientId: number) {
    return this.ingredientsService.findOne(ingredientId);
  }
  @Public()
  @Get()
  getCategories(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    ) {
    return this.ingredientsService.findAll();
  }
  @Roles(Role.ADMIN)
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreateIngredientDto) {
    return this.ingredientsService.create(payload);
  }
  @Roles(Role.ADMIN)
  @Put(':ingredientId')
  update(
    @Param('ingredientId', ParseIntPipe) ingredientId: number,
    @Body() payload: UpdateIngredientDto,
  ) {
    return this.ingredientsService.update(ingredientId, payload);
  }
  
  @Roles(Role.ADMIN)
  @Delete(':ingredientId')
  delete(@Param('ingredientId', ParseIntPipe) ingredientId: number) {
    return this.ingredientsService.delete(ingredientId);
  }
}
