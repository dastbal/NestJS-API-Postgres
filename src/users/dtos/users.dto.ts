import { IsString, IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: ' The  email of the user' })

  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' The password need to be strong' })
  readonly password: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' The role of user' })
  readonly role: string;
  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: ' The  customer' })
  readonly customerId: number;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
