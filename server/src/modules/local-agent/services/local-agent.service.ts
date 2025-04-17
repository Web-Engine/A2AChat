import { Injectable } from '@nestjs/common';
import { LocalAgentRepository } from '../repositories/local-agent.repository';
import { TaskService } from '../../task/services/task.service';
import { Task, TaskStatus, Message } from '../../task/entities/task.entity';
import { LocalAgent } from '../entities/local-agent.entity';

@Injectable()
export class LocalAgentService {
  constructor(
    private readonly localAgentRepository: LocalAgentRepository,
    private readonly taskService: TaskService,
  ) {}

  // LocalAgent 관련 메서드
  async createLocalAgent(
    agentId: string,
    modelName: string,
    systemPrompt: string,
    knowledgeBases: string[],
    mcpTools: string[],
  ): Promise<void> {
    await this.localAgentRepository.createLocalAgent(
      agentId,
      modelName,
      systemPrompt,
      knowledgeBases,
      mcpTools,
    );
  }

  async getLocalAgent(agentId: string): Promise<LocalAgent> {
    return this.localAgentRepository.getLocalAgent(agentId);
  }

  async updateLocalAgent(
    agentId: string,
    modelName?: string,
    systemPrompt?: string,
    knowledgeBases?: string[],
    mcpTools?: string[],
  ): Promise<void> {
    await this.localAgentRepository.updateLocalAgent(
      agentId,
      modelName,
      systemPrompt,
      knowledgeBases,
      mcpTools,
    );
  }

  async removeLocalAgent(agentId: string): Promise<void> {
    await this.localAgentRepository.removeLocalAgent(agentId);
  }

  // Task 관련 메서드
  async createTask(agentId: string): Promise<Task> {
    return this.taskService.create(agentId);
  }

  async getTask(agentId: string, taskId: string): Promise<Task | null> {
    return this.taskService.findOne(taskId);
  }

  async getTasksByAgent(agentId: string): Promise<Task[]> {
    return this.taskService.findByAgentId(agentId);
  }

  async addMessage(agentId: string, taskId: string, message: Message): Promise<Task | null> {
    return this.taskService.addMessage(taskId, message);
  }

  async updateTaskStatus(agentId: string, taskId: string, status: TaskStatus): Promise<Task | null> {
    return this.taskService.updateStatus(taskId, status);
  }
} 