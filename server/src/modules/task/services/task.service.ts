import { Injectable } from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';

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

  async create(task: Task): Promise<Task> {
    return this.repository.create(task);
  }

  async update(id: string, update: Partial<Task>): Promise<Task | null> {
    return this.repository.update(id, update);
  }

  async remove(id: string): Promise<boolean> {
    return this.repository.remove(id);
  }
} 