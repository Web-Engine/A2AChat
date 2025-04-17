import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent } from '../entities/agent.entity';
import { AgentSchemaClass } from './schemas/agent.schema';

@Injectable()
export class AgentRepository {
  constructor(
    @InjectModel(AgentSchemaClass.name)
    private readonly model: Model<Agent>,
  ) {}

  async findAll(): Promise<Agent[]> {
    return this.model.find().lean();
  }

  async findById(id: string): Promise<Agent | null> {
    return this.model.findOne({ id }).lean();
  }

  async create(agent: Agent): Promise<Agent> {
    return this.model.create(agent);
  }

  async update(id: string, update: Partial<Agent>): Promise<Agent | null> {
    return this.model.findOneAndUpdate({ id }, update, { new: true }).lean();
  }

  async remove(id: string): Promise<boolean> {
    const res = await this.model.deleteOne({ id });
    return res.deletedCount > 0;
  }
} 