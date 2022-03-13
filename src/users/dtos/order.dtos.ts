import { IsString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
 
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: ' The  customer' })
  readonly customerId: number;

}
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
