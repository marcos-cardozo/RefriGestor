import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';

import { CreateJobDto } from './dto/create-job.dto';
import { JobsService } from './jobs.service';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Delete(':id')
remove(
  @Param('id', new ParseUUIDPipe())
  id: string,
) {
  return this.jobsService.remove(id);
}

@Patch(':id')
update(
  @Param('id', new ParseUUIDPipe())
  id: string,

  @Body()
  updateJobDto: UpdateJobDto,
) {
  return this.jobsService.update(
    id,
    updateJobDto,
  );
}
}
