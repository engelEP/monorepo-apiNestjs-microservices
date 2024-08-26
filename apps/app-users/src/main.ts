import { NestFactory } from '@nestjs/core';
import { AppUsersModule } from './app-users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppUsersModule);
  await app.listen(5002);
}
bootstrap();
