import { Injectable } from '@nestjs/common'
import { PeriodDto } from './dto'
import { DbService } from 'src/infrastructure/db/db.service'

@Injectable()
export class PeriodService {
  constructor(private db: DbService) {}

  getPeriods(userId: number) {
    return this.db.period.findMany({ where: { userId } })
  }

  createPeriod(userId: number, periodDto: PeriodDto) {
    // TODO: Find better approach to eliminate unnecessary fields
    const { course, ...sanitizedPeriodDto } = periodDto

    return this.db.period.create({
      data: { ...sanitizedPeriodDto, userId },
    })
  }

  deletePeriod(userId: number, id: number) {
    return this.db.period.delete({
      where: { userId, id },
    })
  }
}
