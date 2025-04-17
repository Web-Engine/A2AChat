import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RemoteAgentService } from '../services/remote-agent.service';
import { Task, TaskStatus, Message } from '../../task/entities/task.entity';

@ApiTags('Remote Agent')
@Controller('remote-agents')
export class RemoteAgentController {
  constructor(private readonly remoteAgentService: RemoteAgentService) {}

  @Post(':agentId/tasks')
  @ApiOperation({ summary: '새로운 Task 생성' })
  @ApiResponse({ status: 201, description: '생성 성공', type: Task })
  async createTask(@Param('agentId') agentId: string): Promise<Task> {
    return this.remoteAgentService.createTask(agentId);
  }

  @Get(':agentId/tasks/:taskId')
  @ApiOperation({ summary: '특정 Task 조회' })
  @ApiResponse({ status: 200, description: '성공', type: Task })
  @ApiResponse({ status: 404, description: 'Task가 존재하지 않음' })
  async getTask(@Param('agentId') agentId: string, @Param('taskId') taskId: string): Promise<Task | null> {
    return this.remoteAgentService.getTask(agentId, taskId);
  }

  @Get(':agentId/tasks')
  @ApiOperation({ summary: 'Agent의 모든 Task 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [Task] })
  async getTasksByAgent(@Param('agentId') agentId: string): Promise<Task[]> {
    return this.remoteAgentService.getTasksByAgent(agentId);
  }

  @Post(':agentId/tasks/:taskId/messages')
  @ApiOperation({ summary: 'Task에 메시지 추가' })
  @ApiResponse({ status: 200, description: '성공', type: Task })
  @ApiResponse({ status: 404, description: 'Task가 존재하지 않음' })
  async addMessage(
    @Param('agentId') agentId: string,
    @Param('taskId') taskId: string,
    @Body() message: Message,
  ): Promise<Task | null> {
    return this.remoteAgentService.addMessage(agentId, taskId, message);
  }

  @Put(':agentId/tasks/:taskId/status')
  @ApiOperation({ summary: 'Task 상태 업데이트' })
  @ApiResponse({ status: 200, description: '성공', type: Task })
  @ApiResponse({ status: 404, description: 'Task가 존재하지 않음' })
  async updateTaskStatus(
    @Param('agentId') agentId: string,
    @Param('taskId') taskId: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task | null> {
    return this.remoteAgentService.updateTaskStatus(agentId, taskId, status);
  }
} 