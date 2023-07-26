import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from 'src/auth'
import { CourseModule } from 'src/course'
import { DbModule } from 'src/infrastructure/db'
import { PeriodModule } from 'src/period'
import { UserModule } from 'src/user'

@Module({
  imports: [
    AuthModule,
    CourseModule,
    DbModule,
    UserModule,
    PeriodModule,
    JwtModule.register({
      global: true,
      // TODO: use config module
      secret: 'super secret',
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
