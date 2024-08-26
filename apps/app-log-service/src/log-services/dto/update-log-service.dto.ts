import { PartialType } from '@nestjs/mapped-types';
import { CreateLogServiceDto } from './create-log-service.dto';

export class UpdateLogServiceDto extends PartialType(CreateLogServiceDto) {}
