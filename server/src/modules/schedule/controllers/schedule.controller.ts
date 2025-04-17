import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ScheduleService } from '../services/schedule.service';
import { Schedule } from '../entities/schedule.entity';
import { CreateScheduleDto } from '../dtos/create-schedule.dto';

@ApiTags('Schedule')
@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  @ApiOperation({ summary: '모든 Schedule 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [Schedule] })
  async findAll(): Promise<Schedule[]> {
    return this.scheduleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 Schedule 조회' })
  @ApiResponse({ status: 200, description: '성공', type: Schedule })
  @ApiResponse({ status: 404, description: 'Schedule이 존재하지 않음' })
  async findOne(@Param('id') id: string): Promise<Schedule | null> {
    return this.scheduleService.findOne(id);
  }

  @Get('agent/:agentId')
  @ApiOperation({ summary: '특정 Agent의 모든 예약 실행 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [Schedule] })
  async findByAgentId(@Param('agentId') agentId: string): Promise<Schedule[]> {
    return this.scheduleService.findByAgentId(agentId);
  }

  @Post()
  @ApiOperation({ summary: '새로운 Schedule 생성' })
  @ApiResponse({ status: 201, description: '생성 성공', type: Schedule })
  async create(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.scheduleService.create(createScheduleDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Schedule 정보 업데이트' })
  @ApiResponse({ status: 200, description: '업데이트 성공', type: Schedule })
  @ApiResponse({ status: 404, description: 'Schedule이 존재하지 않음' })
  async update(@Param('id') id: string, @Body() updateScheduleDto: Partial<CreateScheduleDto>): Promise<Schedule | null> {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Schedule 삭제' })
  @ApiResponse({ status: 204, description: '삭제 성공' })
  @ApiResponse({ status: 404, description: 'Schedule이 존재하지 않음' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.scheduleService.remove(id);
  }
} 