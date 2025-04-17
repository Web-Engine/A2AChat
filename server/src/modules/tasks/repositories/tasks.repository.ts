import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskStatus, Message } from '../entities/task.entity';
import { TaskSchemaClass, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectModel(TaskSchemaClass.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async createTask(agentId: string): Promise<Task> {
    const task = await this.taskModel.create({
      id: Date.now().toString(),
      agentId,
      status: TaskStatus.SUBMITTED,
      messages: [],
    });
    return this.toTask(task);
  }

  async getTask(agentId: string, taskId: string): Promise<Task | null> {
    const task = await this.taskModel.findOne({ id: taskId, agentId }).lean();
    return task ? this.toTask(task) : null;
  }

  async getTasksByAgent(agentId: string): Promise<Task[]> {
    const tasks = await this.taskModel.find({ agentId }).lean();
    return tasks.map(task => this.toTask(task));
  }

  async addMessage(agentId: string, taskId: string, message: Message): Promise<Task | null> {
    const task = await this.taskModel.findOneAndUpdate(
      { id: taskId, agentId },
      { $push: { messages: message } },
      { new: true },
    ).lean();
    return task ? this.toTask(task) : null;
  }

  async updateTaskStatus(agentId: string, taskId: string, status: TaskStatus): Promise<Task | null> {
    const task = await this.taskModel.findOneAndUpdate(
      { id: taskId, agentId },
      { status },
      { new: true },
    ).lean();
    return task ? this.toTask(task) : null;
  }

  private toTask(doc: any): Task {
    return {
      id: doc.id,
      agentId: doc.agentId,
      status: doc.status,
      messages: doc.messages,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
} 