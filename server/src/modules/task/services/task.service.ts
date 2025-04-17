import { Injectable } from '@nestjs/common';
import { Task, TaskStatus, Message } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async findAll(): Promise<Task[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<Task | null> {
    return this.repository.findById(id);
  }

  async findByAgentId(agentId: string): Promise<Task[]> {
    return this.repository.findByAgentId(agentId);
  }

  async create(agentId: string): Promise<Task> {
    const task: Task = {
      id: uuidv4(),
      agentId,
      status: TaskStatus.SUBMITTED,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.repository.create(task);
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task | null> {
    return this.repository.update(id, { status, updatedAt: new Date() });
  }

  async addMessage(id: string, message: Message): Promise<Task | null> {
    const task = await this.repository.findById(id);
    if (!task) {
      return null;
    }
    task.messages.push(message);
    return this.repository.update(id, { messages: task.messages, updatedAt: new Date() });
  }

  async update(id: string, update: Partial<Task>): Promise<Task | null> {
    return this.repository.update(id, update);
  }

  async remove(id: string): Promise<boolean> {
    return this.repository.remove(id);
  }
} 