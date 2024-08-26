import { Injectable } from '@nestjs/common';

@Injectable()
export class AppImageService {
  getHello(): string {
    return 'Hello World!';
  }
}
