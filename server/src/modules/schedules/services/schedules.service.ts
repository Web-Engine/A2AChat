import { Injectable } from '@nestjs/common';
import { Schedule } from '../entities/schedule.entity';
import { CreateScheduleDto } from '../dtos/create-schedule.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SchedulesService {
  private schedules: Map<string, Schedule> = new Map();

  findAll(): Schedule[] {
    return Array.from(this.schedules.values());
  }

  findOne(id: string): Schedule | undefined {
    return this.schedules.get(id);
  }

  create(createScheduleDto: CreateScheduleDto): Schedule {
    const id = uuidv4();
    const schedule: Schedule = {
      id,
      enabled: true,
      ...createScheduleDto,
    };
    this.schedules.set(id, schedule);
    return schedule;
  }

  update(id: string, updateScheduleDto: Partial<CreateScheduleDto>): Schedule | undefined {
    const schedule = this.schedules.get(id);
    if (!schedule) return undefined;

    const updatedSchedule = {
      ...schedule,
      ...updateScheduleDto,
    };
    this.schedules.set(id, updatedSchedule);
    return updatedSchedule;
  }

  remove(id: string): boolean {
    return this.schedules.delete(id);
  }

  findByAgentId(agentId: string): Schedule[] {
    return Array.from(this.schedules.values()).filter(
      schedule => schedule.agentId === agentId,
    );
  }
} 