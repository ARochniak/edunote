import { Body, Controller, Delete, Get, Headers, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common'
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

  // TODO: extract custom route handler parameter decorator to extract userId
  @Post()
  createPeriod(@Body() periodDto: PeriodDto, @Headers('user') tokenPayload: JwtTokenPayload) {
    return this.periodService.createPeriod(tokenPayload.sub, periodDto)
  }

  @Delete(':id')
  deletePeriod(@Param('id', ParseIntPipe) id: number, @Headers('user') tokenPayload: JwtTokenPayload) {
    return this.periodService.deletePeriod(tokenPayload.sub, id).catch(() => {
      throw new NotFoundException(`Can't find a period with id ${id}`)
    })
  }
}
