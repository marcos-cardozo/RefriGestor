import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateJobDto } from './dto/create-job.dto';
import { JobsService } from './jobs.service';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobsDto } from './dto/filter-jobs.dto';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los trabajos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de trabajos obtenida con éxito',
  })
  findAll(@Query() filters: FilterJobsDto) {
    return this.jobsService.findAll(filters);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un trabajo',
  })
  @ApiResponse({
    status: 200,
    description: 'Trabajo eliminado con éxito',
  })
  remove(
    @Param('id', new ParseUUIDPipe())
    id: string,
  ) {
    return this.jobsService.remove(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un trabajo',
  })
  @ApiResponse({
    status: 200,
    description: 'Trabajo actualizado con éxito',
  })
  update(
    @Param('id', new ParseUUIDPipe())
    id: string,

    @Body()
    updateJobDto: UpdateJobDto,
  ) {
    return this.jobsService.update(id, updateJobDto);
  }
}
