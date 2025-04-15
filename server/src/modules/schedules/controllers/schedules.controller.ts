import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SchedulesService } from '../services/schedules.service';
import { Schedule } from '../entities/schedule.entity';
import { CreateScheduleDto } from '../dtos/create-schedule.dto';

@ApiTags('Schedule')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  @ApiOperation({ summary: '모든 예약 실행 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [Schedule] })
  async findAll(): Promise<Schedule[]> {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 예약 실행 조회' })
  @ApiResponse({ status: 200, description: '성공', type: Schedule })
  @ApiResponse({ status: 404, description: '예약 실행이 존재하지 않음' })
  async findOne(@Param('id') id: string): Promise<Schedule | null> {
    return this.schedulesService.findOne(id);
  }

  @Get('agent/:agentId')
  @ApiOperation({ summary: '특정 Agent의 모든 예약 실행 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [Schedule] })
  async findByAgentId(@Param('agentId') agentId: string): Promise<Schedule[]> {
    return this.schedulesService.findByAgentId(agentId);
  }

  @Post()
  @ApiOperation({ summary: '새로운 예약 실행 생성' })
  @ApiResponse({ status: 201, description: '생성 성공', type: Schedule })
  async create(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    return this.schedulesService.create(createScheduleDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '예약 실행 업데이트' })
  @ApiResponse({ status: 200, description: '업데이트 성공', type: Schedule })
  @ApiResponse({ status: 404, description: '예약 실행이 존재하지 않음' })
  async update(@Param('id') id: string, @Body() updateScheduleDto: Partial<CreateScheduleDto>): Promise<Schedule | null> {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '예약 실행 삭제' })
  @ApiResponse({ status: 204, description: '삭제 성공' })
  @ApiResponse({ status: 404, description: '예약 실행이 존재하지 않음' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.schedulesService.remove(id);
  }
} 