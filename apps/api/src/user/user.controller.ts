import { Controller, Get, Headers } from '@nestjs/common'
import { JwtTokenPayload } from 'src/auth/types'
import { UserService } from 'src/user/user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  me(@Headers('user') user: JwtTokenPayload) {
    return this.userService.me(user)
  }
}
