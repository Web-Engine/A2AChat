import { Injectable } from '@nestjs/common';
import { Agent } from '../entities/agent.entity';
import { CreateAgentDto } from '../dtos/create-agent.dto';
import { v4 as uuidv4 } from 'uuid';
import { AgentsRepository } from './agents.repository';

@Injectable()
export class AgentsService {
  constructor(
    private readonly repository: AgentsRepository,
  ) {}

  async findAll(): Promise<Agent[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<Agent | null> {
    return this.repository.findById(id);
  }

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const agent: Agent = {
      id: uuidv4(),
      ...createAgentDto,
    };
    return this.repository.create(agent);
  }

  async update(id: string, updateAgentDto: Partial<CreateAgentDto>): Promise<Agent | null> {
    return this.repository.update(id, updateAgentDto);
  }

  async remove(id: string): Promise<boolean> {
    return this.repository.remove(id);
  }
} 