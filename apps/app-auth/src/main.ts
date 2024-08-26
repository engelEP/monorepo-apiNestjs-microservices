import { NestFactory } from '@nestjs/core';
import { AppAuthModule } from './app-auth.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppAuthModule);
  await app.listen(5003);
}
bootstrap();
