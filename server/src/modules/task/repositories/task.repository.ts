import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../entities/task.entity';
import { TaskSchemaClass } from './schemas/task.schema';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(TaskSchemaClass.name)
    private readonly model: Model<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.model.find().lean();
  }

  async findById(id: string): Promise<Task | null> {
    return this.model.findOne({ id }).lean();
  }

  async findByAgentId(agentId: string): Promise<Task[]> {
    return this.model.find({ agentId }).lean();
  }

  async create(task: Task): Promise<Task> {
    return this.model.create(task);
  }

  async update(id: string, update: Partial<Task>): Promise<Task | null> {
    return this.model.findOneAndUpdate({ id }, update, { new: true }).lean();
  }

  async remove(id: string): Promise<boolean> {
    const res = await this.model.deleteOne({ id });
    return res.deletedCount > 0;
  }
} 