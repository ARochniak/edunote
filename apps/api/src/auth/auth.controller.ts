import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'
import { Public } from 'src/auth/decorators'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return await this.authService.login(authDto)
  }

  @Public()
  @Post('register')
  register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto)
  }
}
