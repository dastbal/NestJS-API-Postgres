import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePizzaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' The Name of the pizza' })
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' The  ingrdients of the pizza' })
  readonly description: string;
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: ' The Url of the image' })
  readonly image: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: ' The price of the pizza' })
  readonly price: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: ' The  Category' })
  readonly categoryId: number;

  @IsNotEmpty()
  @ApiProperty({ description: ' The   Ingredients of the pizz' })
  @IsArray()
  readonly ingredientsId: number[];
}
export class UpdatePizzaDto extends PartialType(CreatePizzaDto) {}

export class FilterPizzaDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
  @IsOptional()
  @IsPositive()
  minPrice: number;
  @IsOptional()
  @IsPositive()
  @ValidateIf((x)=> x.minPrice)
  maxPrice: number;
  @IsOptional()
  category: string;
}