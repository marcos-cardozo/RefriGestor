import {
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FilterJobsDto {
  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}