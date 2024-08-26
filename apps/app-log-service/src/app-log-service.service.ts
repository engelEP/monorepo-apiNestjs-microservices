import { Injectable } from '@nestjs/common';

@Injectable()
export class AppLogServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
