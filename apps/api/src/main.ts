import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  // TODO: Extract to config
  await app.listen(4000)
}
bootstrap()
