import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

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
  const allowed = (process.env.CORS_ORIGIN ?? 'http://localhost:3000,http://localhost:5173')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      // Same-origin / server-to-server / mobile webviews sometimes send no Origin
      if (!origin) return callback(null, true);
      if (allowed.includes(origin)) return callback(null, true);
      // Vercel preview / staging hosts while custom domains settle
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
