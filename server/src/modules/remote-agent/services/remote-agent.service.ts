import { Injectable } from '@nestjs/common';
import { RemoteAgentRepository } from '../repositories/remote-agent.repository';
import { TasksService } from '../../tasks/services/tasks.service';
import { Task, TaskStatus, Message } from '../../tasks/entities/task.entity';

@Injectable()
export class RemoteAgentService {
  constructor(
    private readonly remoteAgentRepository: RemoteAgentRepository,
    private readonly tasksService: TasksService,
  ) {}

  // RemoteAgent 관련 메서드
  async createRemoteAgent(agentId: string, endpoint: string, apiKey?: string): Promise<void> {
    await this.remoteAgentRepository.createRemoteAgent(agentId, endpoint, apiKey);
  }

  async getRemoteAgent(agentId: string): Promise<any> {
    return this.remoteAgentRepository.getRemoteAgent(agentId);
  }

  async updateRemoteAgentStatus(agentId: string, status: 'connected' | 'disconnected' | 'error', error?: string): Promise<void> {
    await this.remoteAgentRepository.updateRemoteAgentStatus(agentId, status, error);
  }

  async removeRemoteAgent(agentId: string): Promise<void> {
    await this.remoteAgentRepository.removeRemoteAgent(agentId);
  }

  // Task 관련 메서드
  async createTask(agentId: string): Promise<Task> {
    return this.tasksService.createTask(agentId);
  }

  async getTask(agentId: string, taskId: string): Promise<Task | null> {
    return this.tasksService.getTask(agentId, taskId);
  }

  async getTasksByAgent(agentId: string): Promise<Task[]> {
    return this.tasksService.getTasksByAgent(agentId);
  }

  async addMessage(agentId: string, taskId: string, message: Message): Promise<Task | null> {
    return this.tasksService.addMessage(agentId, taskId, message);
  }

  async updateTaskStatus(agentId: string, taskId: string, status: TaskStatus): Promise<Task | null> {
    return this.tasksService.updateTaskStatus(agentId, taskId, status);
  }
} 