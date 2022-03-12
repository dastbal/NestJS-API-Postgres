import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' The Name of the ingredient' })
  readonly name: string;
}
export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {}
