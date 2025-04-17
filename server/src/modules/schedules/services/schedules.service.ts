import { Injectable } from '@nestjs/common';
import { Schedule } from '../entities/schedule.entity';
import { CreateScheduleDto } from '../dtos/create-schedule.dto';
import { v4 as uuidv4 } from 'uuid';
import { SchedulesRepository } from '../repositories/schedules.repository';

@Injectable()
export class SchedulesService {
  constructor(
    private readonly repository: SchedulesRepository,
  ) {}

  async findAll(): Promise<Schedule[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<Schedule | null> {
    return this.repository.findById(id);
  }

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const schedule: Schedule = {
      id: uuidv4(),
      enabled: createScheduleDto.enabled ?? true,
      ...createScheduleDto,
    };
    return this.repository.create(schedule);
  }

  async update(id: string, updateScheduleDto: Partial<CreateScheduleDto>): Promise<Schedule | null> {
    return this.repository.update(id, updateScheduleDto);
  }

  async remove(id: string): Promise<boolean> {
    return this.repository.remove(id);
  }

  async findByAgentId(agentId: string): Promise<Schedule[]> {
    return this.repository.findByAgentId(agentId);
  }
} 