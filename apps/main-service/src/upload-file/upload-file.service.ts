import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import  * as FormData from 'form-data';

@Injectable()
export class UploadFileService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async create(file) {
    const formData = new FormData();

    formData.append('file', file.buffer, file.originalname);

    const { data } = await firstValueFrom(this.httpService.post(`${process.env.URLIMAGE}`, formData, 
    {
      headers: {
        ...formData.getHeaders()
      }
    }
    ).pipe(catchError(({ response: { data } }) => {
        throw data;
      }))
    );

    return data;
  }
}
