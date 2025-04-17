import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule } from '../entities/schedule.entity';
import { ScheduleSchemaClass } from './schemas/schedule.schema';

@Injectable()
export class ScheduleRepository {
  constructor(
    @InjectModel(ScheduleSchemaClass.name)
    private readonly model: Model<Schedule>,
  ) {}

  async findAll(): Promise<Schedule[]> {
    return this.model.find().lean();
  }

  async findById(id: string): Promise<Schedule | null> {
    return this.model.findOne({ id }).lean();
  }

  async findByAgentId(agentId: string): Promise<Schedule[]> {
    return this.model.find({ agentId }).lean();
  }

  async create(schedule: Schedule): Promise<Schedule> {
    return this.model.create(schedule);
  }

  async update(id: string, update: Partial<Schedule>): Promise<Schedule | null> {
    return this.model.findOneAndUpdate({ id }, update, { new: true }).lean();
  }

  async remove(id: string): Promise<boolean> {
    const res = await this.model.deleteOne({ id });
    return res.deletedCount > 0;
  }
} 