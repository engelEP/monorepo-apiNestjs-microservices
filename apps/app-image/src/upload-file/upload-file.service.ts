import { Injectable } from '@nestjs/common';
import { UpdateUploadFileDto } from './dto/update-upload-file.dto';

@Injectable()
export class UploadFileService {
  create(headers, file: Express.Multer.File) {
    return {
      url: `http://${headers.host}/uploads/${file.filename}`
    }
  }
}
