import { DayOfWeek } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

class PeriodRelationDto {
  @IsNumber()
  periodId: number

  // TODO: Extract in a custom decorator
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek
}

export class CourseDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PeriodRelationDto)
  periods?: PeriodRelationDto[]
}
