import { Injectable, Inject } from '@nestjs/common';
import { Mcp } from '../entities/mcp.entity';
import { CreateMcpDto } from '../dtos/create-mcp.dto';
import { v4 as uuidv4 } from 'uuid';
import { McpRepository } from './mcp.repository';

@Injectable()
export class McpService {
  constructor(
    private readonly repository: McpRepository,
  ) {}

  async findAll(): Promise<Mcp[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<Mcp | null> {
    return this.repository.findById(id);
  }

  async create(createMcpDto: CreateMcpDto): Promise<Mcp> {
    const mcp: Mcp = {
      id: uuidv4(),
      ...createMcpDto,
    };
    return this.repository.create(mcp);
  }

  async update(id: string, updateMcpDto: Partial<CreateMcpDto>): Promise<Mcp | null> {
    return this.repository.update(id, updateMcpDto);
  }

  async remove(id: string): Promise<boolean> {
    return this.repository.remove(id);
  }
} 