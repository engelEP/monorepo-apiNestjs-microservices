import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private logger;
  constructor(
    private readonly httpService: HttpService,
    @Inject('LOGS_SERVICE') private client: ClientProxy,
  ) {
    this.logger = new Logger();
  }

  async create(createAuthDto: CreateAuthDto) {
    const { data } = await firstValueFrom(this.httpService.post(`${process.env.URLAUTH}/auth`, createAuthDto
    ).pipe(catchError(({ response: { data } }) => {
        throw data;
      }))
    );

    if(data.status === 201){
      const response = await firstValueFrom(this.client.send<string>('log_created', {
        id: data.id,
        message: "Users"
      }).pipe(catchError(({ response: { data } }) => {
          throw data;
        }))
      );

      this.logger.log(response)
    }

    return data;
  }

  async login(loginDto: LoginDto) {
    const { data } = await firstValueFrom(this.httpService.post(`${process.env.URLAUTH}/auth/login`, loginDto
    ).pipe(catchError(({ response: { data } }) => {
        throw data;
      }))
    );

    return data
  }
}
