import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { CORS_ORIGINS } from './config/app-urls';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useStaticAssets(join(process.cwd(), process.env.UPLOAD_DIR ?? 'uploads'), {
    prefix: '/uploads',
  });

  const allowed = [...CORS_ORIGINS];

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin) return callback(null, true);
      if ((allowed as string[]).includes(origin)) return callback(null, true);
      if (/^https:\/\/[\w.-]+\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked: ${origin}`), false);
    },
    credentials: true,
  });
  const port = process.env.PORT ?? 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`API listening on http://0.0.0.0:${port}/api`);
}
bootstrap();
