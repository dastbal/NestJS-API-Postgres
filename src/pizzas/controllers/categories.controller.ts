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
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { CategoriesService } from '../services/categories.service';
  
  @ApiTags('Categories')
  @Controller('categories')
  export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}
    @Get(':categoryId')
    @ApiOperation({ summary: 'get a category by id' })
    getCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
      return this.categoriesService.findOne(categoryId);
    }
  
    @Get()
    getCategories(
      @Query('limit') limit: number = 10,
      @Query('offset') offset: number = 0,
    ) {
      return this.categoriesService.findAll();
    }
  
    @Post()
    @HttpCode(HttpStatus.ACCEPTED)
    create(@Body() payload: CreateCategoryDto) {
      return this.categoriesService.create(payload);
    }
    @Put(':customerId')
    update(
      @Param('customerId', ParseIntPipe) customerId: number,
      @Body() payload: UpdateCategoryDto,
    ) {
      return this.categoriesService.update(customerId, payload);
    }
    @Delete(':customerId')
    delete(@Param('customerId', ParseIntPipe) customerId: number) {
      return this.categoriesService.delete(customerId);
    }
  }
  

