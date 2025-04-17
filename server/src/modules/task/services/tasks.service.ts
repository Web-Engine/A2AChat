import { Injectable } from '@nestjs/common';
import { Task, TaskStatus, Message } from '../entities/task.entity';
import { TasksRepository } from '../repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async createTask(agentId: string): Promise<Task> {
    return this.tasksRepository.createTask(agentId);
  }

  async getTask(agentId: string, taskId: string): Promise<Task | null> {
    return this.tasksRepository.getTask(agentId, taskId);
  }

  async getTasksByAgent(agentId: string): Promise<Task[]> {
    return this.tasksRepository.getTasksByAgent(agentId);
  }

  async addMessage(agentId: string, taskId: string, message: Message): Promise<Task | null> {
    return this.tasksRepository.addMessage(agentId, taskId, message);
  }

  async updateTaskStatus(agentId: string, taskId: string, status: TaskStatus): Promise<Task | null> {
    return this.tasksRepository.updateTaskStatus(agentId, taskId, status);
  }
} 