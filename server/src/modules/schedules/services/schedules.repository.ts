import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, Schema } from 'mongoose';
import { Schedule } from '../entities/schedule.entity';

const ScheduleSchema = new Schema<Schedule>({
  id: { type: String, required: true, unique: true },
  agentId: { type: String, required: true },
  cronExpression: { type: String, required: true },
  description: { type: String },
  enabled: { type: Boolean, required: true, default: true },
});

@Injectable()
export class SchedulesRepository {
  private readonly model: Model<Schedule>;

  constructor(@InjectConnection() connection: Connection) {
    this.model = connection.model<Schedule>('Schedule', ScheduleSchema);
  }

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