import { Injectable } from '@nestjs/common';
import { Agent, AgentType } from '../entities/agent.entity';
import { CreateAgentDto } from '../dtos/create-agent.dto';
import { v4 as uuidv4 } from 'uuid';
import { AgentRepository } from '../repositories/agent.repository';
import { RemoteAgentService } from '../../remote-agent/services/remote-agent.service';

@Injectable()
export class AgentService {
  constructor(
    private readonly repository: AgentRepository,
    private readonly remoteAgentService: RemoteAgentService,
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

    const createdAgent = await this.repository.create(agent);

    // Remote Agent인 경우 RemoteAgent 생성
    if (createdAgent.type === AgentType.REMOTE && createAgentDto.endpoint) {
      await this.remoteAgentService.createRemoteAgent(
        createdAgent.id,
        createAgentDto.endpoint,
        createAgentDto.apiKey || undefined,
      );
    }

    return createdAgent;
  }

  async update(id: string, updateAgentDto: Partial<CreateAgentDto>): Promise<Agent | null> {
    return this.repository.update(id, updateAgentDto);
  }

  async remove(id: string): Promise<boolean> {
    const agent = await this.repository.findById(id);
    if (agent?.type === AgentType.REMOTE) {
      await this.remoteAgentService.removeRemoteAgent(id);
    }
    return this.repository.remove(id);
  }
} 