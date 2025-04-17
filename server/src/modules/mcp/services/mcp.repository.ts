import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, Schema } from 'mongoose';
import { Mcp, McpType } from '../entities/mcp.entity';

// Mongoose 스키마 정의
const McpSchema = new Schema<Mcp>({
  id: { type: String, required: true, unique: true },
  type: { type: String, enum: Object.values(McpType), required: true },
  command: { type: String, required: true },
  args: { type: [String], required: true },
  env: { type: Object, required: true },
  name: { type: String, required: true },
  description: { type: String },
});

@Injectable()
export class McpRepository {
  private readonly model: Model<Mcp>;

  constructor(@InjectConnection() connection: Connection) {
    this.model = connection.model<Mcp>('Mcp', McpSchema);
  }

  async findAll(): Promise<Mcp[]> {
    return this.model.find().lean();
  }

  async findById(id: string): Promise<Mcp | null> {
    return this.model.findOne({ id }).lean();
  }

  async create(mcp: Mcp): Promise<Mcp> {
    return this.model.create(mcp);
  }

  async update(id: string, update: Partial<Mcp>): Promise<Mcp | null> {
    return this.model.findOneAndUpdate({ id }, update, { new: true }).lean();
  }

  async remove(id: string): Promise<boolean> {
    const res = await this.model.deleteOne({ id });
    return res.deletedCount > 0;
  }
} 