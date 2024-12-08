import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  isPair(n: number): boolean {
    return n % 2 === 0;
  }

  isPrime(n: number): boolean {
    if (n <= 1) return false;
    for (let i = 2; i < Math.sqrt(n) + 1; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  factorial(n: number): number {
    return n === 0 ? 1 : n * this.factorial(n - 1);
  }

  sumN(n: number): number {
    return (n * (n + 1)) / 2;
  }

  factors(n: number): number[] {
    const factors = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) factors.push(i);
    }
    return factors;
  }

  fibonacci(n: number): number {
    const fib = [0, 1];
    for (let i = 2; i <= n; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n];
  }

}
