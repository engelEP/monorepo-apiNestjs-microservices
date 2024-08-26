import { Injectable } from '@nestjs/common';
import { CreateLogServiceDto } from './dto/create-log-service.dto';
import { UpdateLogServiceDto } from './dto/update-log-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LogService } from './entities/log-service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogServicesService {
  constructor(
    @InjectRepository(LogService)
    private logsRepository: Repository<LogService>,
  ) {}

  async create(payload) {
    const newLog = this.logsRepository.create({
      description: `${payload.message} created, id: ${payload.id}`,
      date: new Date(Date.now())
    });

    const addedLog = await this.logsRepository.save(newLog);
    if(!addedLog) 
      return `Error add new ${payload.message} id: ${payload.id}`;

    return `Added new ${payload.message} id: ${payload.id}`;
  }

  async findAll() {
    return await this.logsRepository.find();
  }

  findOne(payload) {
    return this.logsRepository.findOne({
      where: { id: payload.id }
    });
  }
}
