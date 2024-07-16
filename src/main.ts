import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    //add middleware here!!!!
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    SwaggerConfig.init(app);
    await app.listen(5000);
}
bootstrap();
