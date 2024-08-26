import { Controller, Post, UseInterceptors, UploadedFile, Headers } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../multer/multer.config';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}
  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Headers() headers
  ) {
    return this.uploadFileService.create(headers, file);
  }
}
