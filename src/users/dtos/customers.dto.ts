import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' The name' })
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' The  last name' })
  readonly lastName: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: ' The phone number' })
  readonly phone: string;
 
}
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
