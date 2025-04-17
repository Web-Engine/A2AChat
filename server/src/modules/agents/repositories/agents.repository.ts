import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent } from '../entities/agent.entity';
import { AgentSchemaClass, AgentDocument } from './schemas/agent.schema';

@Injectable()
export class AgentsRepository {
  constructor(
    @InjectModel(AgentSchemaClass.name) private readonly agentModel: Model<AgentDocument>,
  ) {}

  async findAll(): Promise<Agent[]> {
    return this.agentModel.find().lean();
  }

  async findById(id: string): Promise<Agent | null> {
    return this.agentModel.findOne({ id }).lean();
  }

  async create(agent: Agent): Promise<Agent> {
    return this.agentModel.create(agent);
  }

  async update(id: string, update: Partial<Agent>): Promise<Agent | null> {
    return this.agentModel.findOneAndUpdate({ id }, update, { new: true }).lean();
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.agentModel.deleteOne({ id });
    return result.deletedCount > 0;
  }
} 