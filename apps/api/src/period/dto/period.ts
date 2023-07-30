import { DayOfWeek } from '@prisma/client'
import { IsEnum, IsOptional, IsNumber } from 'class-validator'

export class PeriodDto {
  @IsNumber()
  startAt: number

  @IsNumber()
  endAt: number

  @IsOptional()
  @IsEnum(DayOfWeek)
  dayOfWeek?: DayOfWeek

  @IsOptional()
  @IsNumber()
  course?: number
}
