import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'calculator_queue',
        queueOptions: { durable: false },
      },
    });
  }

  @Get('calculate')
  async calculate(@Query('n') n: string) {
    if (!n) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'El número no puede ser nulo o vacío.',
        error: 'Solicitud Incorrecta',
      });
    }

    const number = Number(n); // Convertir el valor a número
    if (!Number.isInteger(number) || number <= 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'El número debe ser un entero positivo.',
        error: 'Solicitud Incorrecta',
      });
    }

    return this.client.send('calculate', number);
  }
}
