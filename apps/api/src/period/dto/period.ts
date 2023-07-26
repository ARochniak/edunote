import { DayOfWeek } from '@prisma/client'
import { IsEnum, IsOptional, IsDate, IsNumber } from 'class-validator'
import { Transform } from 'class-transformer'

export class PeriodDto {
  @IsDate()
  @Transform(({ value }) => new Date(value))
  startTime: Date

  @IsDate()
  @Transform(({ value }) => new Date(value))
  endTime: Date

  @IsOptional()
  @IsEnum(DayOfWeek)
  dayOfWeek?: DayOfWeek

  @IsOptional()
  @IsNumber()
  course?: number
}
