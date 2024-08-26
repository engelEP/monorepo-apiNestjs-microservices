import { NestFactory } from '@nestjs/core';
import { AppLogServiceModule } from './app-log-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppLogServiceModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
