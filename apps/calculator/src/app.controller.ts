import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('calculate')
  calculate(n: number) {
    return {
      isPair: this.appService.isPair(n),
      isPrime: this.appService.isPrime(n),
      factorial: this.appService.factorial(n),
      sumN: this.appService.sumN(n),
      factors: this.appService.factors(n),
      fibonacci: this.appService.fibonacci(n),
    };
  }
}
