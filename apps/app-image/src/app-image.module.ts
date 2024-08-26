import { Module } from '@nestjs/common';
import { AppImageController } from './app-image.controller';
import { AppImageService } from './app-image.service';
import { UploadFileModule } from './upload-file/upload-file.module';

@Module({
  imports: [UploadFileModule],
  controllers: [AppImageController],
  providers: [AppImageService],
})
export class AppImageModule {}
