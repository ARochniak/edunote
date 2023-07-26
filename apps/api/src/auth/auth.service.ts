import { UnauthorizedException, Injectable, ForbiddenException } from '@nestjs/common'
import { AuthDto } from './dto'
import { DbService } from 'src/infrastructure/db/db.service'
import * as argon2 from 'argon2'
import { Prisma } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { JwtTokenPayload } from 'src/auth/types'
import omit from 'lodash/omit'

@Injectable()
export class AuthService {
  constructor(private dbService: DbService, private jwtService: JwtService) {}

  async register(authDto: AuthDto) {
    try {
      const hash = await argon2.hash(authDto.password)
      const user = await this.dbService.user.create({
        data: {
          email: authDto.email,
          hash,
        },
      })

      return omit(user, 'hash')
    } catch (err) {
      this.handleCreateException(err)
    }
  }

  async login(authDto: AuthDto) {
    const user = await this.dbService.user.findUnique({
      where: { email: authDto.email },
    })

    if (!user) throw new UnauthorizedException()

    const isPasswordValid = await argon2.verify(user.hash, authDto.password)
    if (!isPasswordValid) throw new UnauthorizedException()

    const tokenPayload: JwtTokenPayload = {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    }

    return { jtwToken: this.jwtService.sign(tokenPayload) }
  }

  private handleCreateException(err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002')
      throw new ForbiddenException('Credentials taken')

    throw err
  }
}
