import morgan from "morgan"

import { Logger, ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app.module"

// function enableCors(app: INestApplication): void {
//     if (process.env.NODE_ENV === 'production') {
//         const corsOrigin = app
//             .get(ConfigService<{ CORS_ORIGIN: string }>)
//             .get<string>('CORS_ORIGIN');

//         if (!corsOrigin) {
//             throw new Error('CORS origin is missing');
//         }

//         app.enableCors({
//             origin: [corsOrigin],
//             methods: 'POST,GET,PUT,PATCH,DELETE,OPTIONS',
//             credentials: true,
//         });
//     } else if (process.env.NODE_ENV === 'development') {
//         app.enableCors();
//     }
// }

async function bootstrap(): Promise<void> {
  const logger = new Logger("Bootstrap")

  try {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(new ValidationPipe())
    app.use(morgan("dev"))

    const port = app.get(ConfigService).getOrThrow<string>("PORT")

    await app.listen(port)
  } catch (error) {
    logger.error("Error while bootstrapping, application will shut down.")
    process.exit(1)
  }
}

bootstrap()
