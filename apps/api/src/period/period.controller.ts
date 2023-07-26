import { Body, Controller, Get, Headers, Post } from '@nestjs/common'
import { PeriodService } from './period.service'
import { JwtTokenPayload } from 'src/auth/types'
import { PeriodDto } from './dto'

@Controller('period')
export class PeriodController {
  constructor(private periodService: PeriodService) {}

  @Get()
  getPeriods(@Headers('user') tokenPayload: JwtTokenPayload) {
    return this.periodService.getPeriods(tokenPayload.sub)
  }

  @Post()
  createPeriod(@Body() periodDto: PeriodDto, @Headers('user') tokenPayload: JwtTokenPayload) {
    return this.periodService.createPeriod(tokenPayload.sub, periodDto)
  }
}
