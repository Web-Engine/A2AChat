import { Injectable } from '@nestjs/common';
import { Mcp } from '../entities/mcp.entity';
import { CreateMcpDto } from '../dtos/create-mcp.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class McpsService {
  private configs: Map<string, Mcp> = new Map();

  findAll(): Mcp[] {
    return Array.from(this.configs.values());
  }

  findOne(id: string): Mcp | undefined {
    return this.configs.get(id);
  }

  create(createMcpDto: CreateMcpDto): Mcp {
    const id = uuidv4();
    const config: Mcp = {
      ...createMcpDto,
    };
    this.configs.set(id, config);
    return config;
  }

  update(id: string, updateMcpDto: Partial<CreateMcpDto>): Mcp | undefined {
    const config = this.configs.get(id);
    if (!config) return undefined;

    const updatedConfig = {
      ...config,
      ...updateMcpDto,
    };
    this.configs.set(id, updatedConfig);
    return updatedConfig;
  }

  remove(id: string): boolean {
    return this.configs.delete(id);
  }
} 