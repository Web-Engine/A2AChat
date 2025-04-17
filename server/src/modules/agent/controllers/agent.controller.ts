import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AgentService } from '../services/agent.service';
import { Agent } from '../entities/agent.entity';
import { CreateAgentDto } from '../dtos/create-agent.dto';

@ApiTags('Agent')
@Controller('agents')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get()
  @ApiOperation({ summary: '모든 Agent 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [Agent] })
  async findAll(): Promise<Agent[]> {
    return this.agentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 Agent 조회' })
  @ApiResponse({ status: 200, description: '성공', type: Agent })
  @ApiResponse({ status: 404, description: 'Agent가 존재하지 않음' })
  async findOne(@Param('id') id: string): Promise<Agent | null> {
    return this.agentService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '새로운 Agent 생성' })
  @ApiResponse({ status: 201, description: '생성 성공', type: Agent })
  async create(@Body() createAgentDto: CreateAgentDto): Promise<Agent> {
    return this.agentService.create(createAgentDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Agent 정보 업데이트' })
  @ApiResponse({ status: 200, description: '업데이트 성공', type: Agent })
  @ApiResponse({ status: 404, description: 'Agent가 존재하지 않음' })
  async update(@Param('id') id: string, @Body() updateAgentDto: Partial<CreateAgentDto>): Promise<Agent | null> {
    return this.agentService.update(id, updateAgentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Agent 삭제' })
  @ApiResponse({ status: 204, description: '삭제 성공' })
  @ApiResponse({ status: 404, description: 'Agent가 존재하지 않음' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.agentService.remove(id);
  }
} 