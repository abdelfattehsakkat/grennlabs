import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security headers
  app.use(helmet());

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // CORS — limité à l'origine frontend en prod
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3005',
    credentials: true,
  });

  await app.listen(3006);
  console.log(`Backend Green IT démarré sur le port 3006`);
}
bootstrap();
