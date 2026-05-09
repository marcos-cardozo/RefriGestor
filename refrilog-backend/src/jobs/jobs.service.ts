import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobsDto } from './dto/filter-jobs.dto';

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
        cantidadTrabajos: Number(result?.cantidadTrabajos) || 0,
      },
    };
  }

  async findAll(filters: FilterJobsDto) {
  const {
    clientName,
    date,
    page = '1',
    limit = '10',
  } = filters;

  const query =
    this.jobsRepository.createQueryBuilder('job');

  if (clientName) {
    query.andWhere(
      'LOWER(job.clientName) LIKE LOWER(:clientName)',
      {
        clientName: `%${clientName}%`,
      },
    );
  }

  if (date) {
    query.andWhere(
      'TO_CHAR(job.date, \'YYYY-MM\') = :date',
      {
        date,
      },
    );
  }

  query.orderBy('job.createdAt', 'DESC');

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip =
    (pageNumber - 1) * limitNumber;

  query.skip(skip).take(limitNumber);

  const [jobs, total] =
    await query.getManyAndCount();

  return {
    message: 'Trabajos obtenidos con éxito',
    data: jobs,
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(
        total / limitNumber,
      ),
    },
  };
}
}
