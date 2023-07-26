import { Global, Module } from '@nestjs/common'
import { DbService } from 'src/infrastructure/db/db.service'

@Global()
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
