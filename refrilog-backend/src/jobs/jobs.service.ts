import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const job = this.jobsRepository.create(createJobDto);

    const savedJob = await this.jobsRepository.save(job);

    return {
      message: 'El trabajo fue agregado a la lista con éxito',
      data: savedJob,
    };
  }

  async findAll() {
    const jobs = await this.jobsRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      message: 'Trabajos obtenidos con éxito',
      data: jobs,
    };
  }

  async remove(id: string) {
    const job = await this.jobsRepository.findOneBy({ id });

    if (!job) {
      throw new NotFoundException('El trabajo no existe');
    }

    await this.jobsRepository.delete(id);

    return {
      message: 'Trabajo eliminado con éxito',
    };
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    const job = await this.jobsRepository.findOneBy({ id });

    if (!job) {
      throw new NotFoundException('El trabajo no existe');
    }

    await this.jobsRepository.update(id, updateJobDto);

    const updatedJob = await this.jobsRepository.findOneBy({
      id,
    });

    return {
      message: 'Trabajo actualizado con éxito',
      data: updatedJob,
    };
  }

  async getStats() {
  const result = await this.jobsRepository
    .createQueryBuilder('job')
    .select('SUM(job.amount)', 'totalGanado')
    .addSelect('COUNT(job.id)', 'cantidadTrabajos')
    .getRawOne<{
      totalGanado: string;
      cantidadTrabajos: string;
    }>();

  return {
    message: 'Estadísticas obtenidas con éxito',
    data: {
      totalGanado: Number(result?.totalGanado) || 0,
      cantidadTrabajos:
        Number(result?.cantidadTrabajos) || 0,
    },
  };
}
}
