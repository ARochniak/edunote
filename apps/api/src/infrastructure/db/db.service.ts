import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class DbService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          // TODO: use config module
          url: 'postgresql://postgres:123@localhost:5432/edunote?schema=public',
        },
      },
    })
  }
}
