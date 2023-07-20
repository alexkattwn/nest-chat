import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    const PORT = process.env.PORT || 3000

    app.enableCors()
    app.useStaticAssets(join(__dirname, '..', 'static'))
    app.setBaseViewsDir(join(__dirname, '..', 'views'))
    app.setViewEngine('ejs')

    await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
}

bootstrap()
