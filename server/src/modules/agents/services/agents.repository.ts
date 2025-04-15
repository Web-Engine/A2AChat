import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, Schema } from 'mongoose';
import { Agent, AgentType } from '../entities/agent.entity';

const AgentSchema = new Schema<Agent>({
  id: { type: String, required: true, unique: true },
  type: { type: String, enum: Object.values(AgentType), required: true },
  name: { type: String, required: true },
  description: { type: String },
});

@Injectable()
export class AgentsRepository {
  private readonly model: Model<Agent>;

  constructor(@InjectConnection() connection: Connection) {
    this.model = connection.model<Agent>('Agent', AgentSchema);
  }

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