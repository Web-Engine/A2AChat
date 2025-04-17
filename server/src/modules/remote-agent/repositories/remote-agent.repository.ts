import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RemoteAgentSchemaClass, RemoteAgentDocument } from './schemas/remote-agent.schema';

@Injectable()
export class RemoteAgentRepository {
  constructor(
    @InjectModel(RemoteAgentSchemaClass.name) private readonly remoteAgentModel: Model<RemoteAgentDocument>,
  ) {}

  async createRemoteAgent(agentId: string, endpoint: string, apiKey?: string): Promise<void> {
    await this.remoteAgentModel.create({
      agentId,
      endpoint,
      apiKey,
      status: 'disconnected',
    });
  }

  async getRemoteAgent(agentId: string): Promise<any> {
    return this.remoteAgentModel.findOne({ agentId }).lean();
  }

  async updateRemoteAgentStatus(agentId: string, status: 'connected' | 'disconnected' | 'error', error?: string): Promise<void> {
    await this.remoteAgentModel.findOneAndUpdate(
      { agentId },
      {
        status,
        lastConnectedAt: status === 'connected' ? new Date() : undefined,
        lastError: error,
      },
    );
  }

  async removeRemoteAgent(agentId: string): Promise<void> {
    await this.remoteAgentModel.deleteOne({ agentId });
  }
} 