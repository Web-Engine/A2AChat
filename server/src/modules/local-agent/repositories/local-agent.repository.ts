import { Injectable } from '@nestjs/common';
import { LocalAgent } from '../entities/local-agent.entity';

@Injectable()
export class LocalAgentRepository {
  private agents: Map<string, LocalAgent> = new Map();

  async createLocalAgent(
    agentId: string,
    modelName: string,
    systemPrompt: string,
    knowledgeBases: string[],
    mcpTools: string[],
  ): Promise<void> {
    const agent: LocalAgent = {
      agentId,
      modelName,
      systemPrompt,
      knowledgeBases,
      mcpTools,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.agents.set(agentId, agent);
  }

  async getLocalAgent(agentId: string): Promise<LocalAgent> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`LocalAgent not found: ${agentId}`);
    }
    return agent;
  }

  async updateLocalAgent(
    agentId: string,
    modelName?: string,
    systemPrompt?: string,
    knowledgeBases?: string[],
    mcpTools?: string[],
  ): Promise<void> {
    const agent = await this.getLocalAgent(agentId);
    
    if (modelName) agent.modelName = modelName;
    if (systemPrompt) agent.systemPrompt = systemPrompt;
    if (knowledgeBases) agent.knowledgeBases = knowledgeBases;
    if (mcpTools) agent.mcpTools = mcpTools;
    
    agent.updatedAt = new Date();
    this.agents.set(agentId, agent);
  }

  async removeLocalAgent(agentId: string): Promise<void> {
    if (!this.agents.has(agentId)) {
      throw new Error(`LocalAgent not found: ${agentId}`);
    }
    this.agents.delete(agentId);
  }
} 