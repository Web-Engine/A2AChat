import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent } from '../entities/agent.entity';
import { CreateAgentDto } from '../dtos/create-agent.dto';
import { TaskService } from '../../task/services/task.service';
import { Task, TaskStatus, Message } from '../../task/entities/task.entity';
import { AgentType } from '../entities/agent-type.enum';

@Injectable()
export class AgentService {
  constructor(
    @InjectModel('Agent') private readonly agentModel: Model<Agent>,
    private readonly taskService: TaskService,
  ) {}

  async findAll(): Promise<Agent[]> {
    return this.agentModel.find().exec();
  }

  async findOne(id: string): Promise<Agent | null> {
    return this.agentModel.findById(id).exec();
  }

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const now = new Date();
    const agent = new this.agentModel({
      ...createAgentDto,
      createdAt: now,
      updatedAt: now,
    });

    // Agent 타입에 따라 적절한 설정을 추가
    if (createAgentDto.type === AgentType.LOCAL && createAgentDto.localConfig) {
      agent.localConfig = createAgentDto.localConfig;
    } else if (createAgentDto.type === AgentType.REMOTE && createAgentDto.remoteConfig) {
      agent.remoteConfig = createAgentDto.remoteConfig;
    }

    return agent.save();
  }

  async update(id: string, updateAgentDto: Partial<CreateAgentDto>): Promise<Agent | null> {
    return this.agentModel
      .findByIdAndUpdate(
        id,
        { ...updateAgentDto, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.agentModel.findByIdAndDelete(id).exec();
  }

  // Task 관련 메서드
  async createTask(agentId: string): Promise<Task> {
    const agent = await this.findOne(agentId);
    if (!agent) {
      throw new NotFoundException(`Agent with ID ${agentId} not found`);
    }
    return this.taskService.create(agentId);
  }

  async getTask(agentId: string, taskId: string): Promise<Task | null> {
    const agent = await this.findOne(agentId);
    if (!agent) {
      throw new NotFoundException(`Agent with ID ${agentId} not found`);
    }
    return this.taskService.findOne(taskId);
  }

  async getTasksByAgent(agentId: string): Promise<Task[]> {
    const agent = await this.findOne(agentId);
    if (!agent) {
      throw new NotFoundException(`Agent with ID ${agentId} not found`);
    }
    return this.taskService.findByAgentId(agentId);
  }

  async addMessage(agentId: string, taskId: string, message: Message): Promise<Task | null> {
    const agent = await this.findOne(agentId);
    if (!agent) {
      throw new NotFoundException(`Agent with ID ${agentId} not found`);
    }
    return this.taskService.addMessage(taskId, message);
  }

  async updateTaskStatus(agentId: string, taskId: string, status: TaskStatus): Promise<Task | null> {
    const agent = await this.findOne(agentId);
    if (!agent) {
      throw new NotFoundException(`Agent with ID ${agentId} not found`);
    }
    return this.taskService.updateStatus(taskId, status);
  }
} 