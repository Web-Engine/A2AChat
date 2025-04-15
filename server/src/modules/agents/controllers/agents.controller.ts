import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AgentsService } from '../services/agents.service';
import { Agent } from '../entities/agent.entity';
import { CreateAgentDto } from '../dtos/create-agent.dto';

@ApiTags('Agent')
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  @ApiOperation({ summary: '모든 Agent 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [Agent] })
  findAll(): Agent[] {
    return this.agentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 Agent 조회' })
  @ApiResponse({ status: 200, description: '성공', type: Agent })
  @ApiResponse({ status: 404, description: 'Agent가 존재하지 않음' })
  findOne(@Param('id') id: string): Agent | undefined {
    return this.agentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '새로운 Agent 생성' })
  @ApiResponse({ status: 201, description: '생성 성공', type: Agent })
  create(@Body() createAgentDto: CreateAgentDto): Agent {
    return this.agentsService.create(createAgentDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Agent 정보 업데이트' })
  @ApiResponse({ status: 200, description: '업데이트 성공', type: Agent })
  @ApiResponse({ status: 404, description: 'Agent가 존재하지 않음' })
  update(@Param('id') id: string, @Body() updateAgentDto: Partial<CreateAgentDto>): Agent | undefined {
    return this.agentsService.update(id, updateAgentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Agent 삭제' })
  @ApiResponse({ status: 204, description: '삭제 성공' })
  @ApiResponse({ status: 404, description: 'Agent가 존재하지 않음' })
  remove(@Param('id') id: string): void {
    this.agentsService.remove(id);
  }
} 