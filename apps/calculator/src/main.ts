import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let connected = false;

  while (!connected) {
    try {
      app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
          queue: 'calculator_queue', // Cola para Calculator
          queueOptions: {
            durable: false,
          },
        },
      });

      await app.startAllMicroservices();
      connected = true;
    } catch (err) {
      console.error('RabbitMQ no está listo. Reintentando en 5 segundos...');
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  await app.listen(process.env.APP_PORT || 3001); // Puerto para Calculator
}

bootstrap();
