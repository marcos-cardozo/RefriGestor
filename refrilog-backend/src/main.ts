import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://refri-gestor.vercel.app'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('RefriLog API')
    .setDescription('API para gestión de trabajos de refrigeración')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `🚀 RefriLog API running on: http://localhost:${process.env.PORT ?? 3000}`,
  );

  console.log(
    `📚 Swagger docs: http://localhost:${process.env.PORT ?? 3000}/api`,
  );

  console.log(process.env.NODE_ENV);
}

bootstrap();
