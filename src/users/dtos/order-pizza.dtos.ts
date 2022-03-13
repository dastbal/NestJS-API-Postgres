import { IsString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderPizzaDto {
 
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: ' The  customer' })
  readonly orderId: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: ' The  customer' })
  readonly pizzaId: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: ' The  customer' })
  readonly quantity: number;

}
export class UpdateOrderPizzaDto extends PartialType(CreateOrderPizzaDto) {}
