import { NestFactory } from '@nestjs/core';
import { AppImageModule } from './app-image.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppImageModule);

  app.useStaticAssets(join(__dirname, '..', '../../apps/app-image/public'));
  await app.listen(5006);
}
bootstrap();
