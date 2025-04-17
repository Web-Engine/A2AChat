import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskService } from '../services/task.service';
import { Task, TaskStatus, Message } from '../entities/task.entity';

@ApiTags('Task')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: '모든 Task 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [Task] })
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 Task 조회' })
  @ApiResponse({ status: 200, description: '성공', type: Task })
  @ApiResponse({ status: 404, description: 'Task가 존재하지 않음' })
  async findOne(@Param('id') id: string): Promise<Task | null> {
    return this.taskService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '새로운 Task 생성' })
  @ApiResponse({ status: 201, description: '생성 성공', type: Task })
  async create(@Body() createTaskDto: { agentId: string }): Promise<Task> {
    return this.taskService.create(createTaskDto.agentId);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Task 상태 업데이트' })
  @ApiResponse({ status: 200, description: '업데이트 성공', type: Task })
  @ApiResponse({ status: 404, description: 'Task가 존재하지 않음' })
  async updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Promise<Task | null> {
    return this.taskService.updateStatus(id, status);
  }

  @Post(':id/messages')
  @ApiOperation({ summary: 'Task에 메시지 추가' })
  @ApiResponse({ status: 200, description: '성공', type: Task })
  @ApiResponse({ status: 404, description: 'Task가 존재하지 않음' })
  async addMessage(@Param('id') id: string, @Body() message: Message): Promise<Task | null> {
    return this.taskService.addMessage(id, message);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Task 삭제' })
  @ApiResponse({ status: 204, description: '삭제 성공' })
  @ApiResponse({ status: 404, description: 'Task가 존재하지 않음' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.taskService.remove(id);
  }
} 