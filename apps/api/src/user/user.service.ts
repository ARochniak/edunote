import { Injectable } from '@nestjs/common'
import { JwtTokenPayload } from 'src/auth/types'
import { DbService } from 'src/infrastructure/db/db.service'
import omit from 'lodash/omit'

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}

  async me(tokenPayload: JwtTokenPayload) {
    const user = await this.dbService.user.findUnique({
      where: { id: tokenPayload.sub },
    })

    return omit(user, 'hash')
  }
}
