import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthController } from 'src/auth/auth.controller'
import { AuthGuard } from 'src/auth/auth.guard'
import { AuthService } from 'src/auth/auth.service'

@Module({
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  controllers: [AuthController],
  imports: [],
})
export class AuthModule {}
