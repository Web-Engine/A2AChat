import { Injectable } from '@nestjs/common';
import { Agent } from '../entities/agent.entity';
import { CreateAgentDto } from '../dtos/create-agent.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AgentsService {
  private agents: Agent[] = [];

  findAll(): Agent[] {
    return this.agents;
  }

  findOne(id: string): Agent | undefined {
    return this.agents.find(agent => agent.id === id);
  }

  create(createAgentDto: CreateAgentDto): Agent {
    const agent: Agent = {
      id: uuidv4(),
      ...createAgentDto,
    };
    this.agents.push(agent);
    return agent;
  }

  update(id: string, updateAgentDto: Partial<CreateAgentDto>): Agent | undefined {
    const index = this.agents.findIndex(agent => agent.id === id);
    if (index === -1) return undefined;

    this.agents[index] = {
      ...this.agents[index],
      ...updateAgentDto,
    };
    return this.agents[index];
  }

  remove(id: string): boolean {
    const index = this.agents.findIndex(agent => agent.id === id);
    if (index === -1) return false;

    this.agents.splice(index, 1);
    return true;
  }
} 