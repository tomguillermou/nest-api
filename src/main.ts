import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    const configService = app.get(ConfigService);
    const port = configService.get<string>('PORT');

    if (!port) {
        Logger.error('Port number is missing. Application will be closed.');
        process.exit(1);
    }

    await app.listen(port);
}
bootstrap();
