import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde el archivo .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let connected = false;

  while (!connected) {
    try {
      app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
          queue: 'api_queue', // Cola para API
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

  await app.listen(process.env.APP_PORT || 3000); // Puerto para la API
}

bootstrap();
