import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({
    example: 'Juan Pérez',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  clientName!: string;

  @ApiProperty({
    example:
      'Reparación de compresor y carga de gas',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  description!: string;

  @ApiProperty({
    example: 70000,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  amount!: number;

  @ApiProperty({
    example: '2026-05-08',
  })
  @IsDateString()
  date!: string;
}