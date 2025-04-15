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
  findAll(): Schedule[] {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 예약 실행 조회' })
  @ApiResponse({ status: 200, description: '성공', type: Schedule })
  @ApiResponse({ status: 404, description: '예약 실행이 존재하지 않음' })
  findOne(@Param('id') id: string): Schedule | undefined {
    return this.schedulesService.findOne(id);
  }

  @Get('agent/:agentId')
  @ApiOperation({ summary: '특정 Agent의 모든 예약 실행 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [Schedule] })
  findByAgentId(@Param('agentId') agentId: string): Schedule[] {
    return this.schedulesService.findByAgentId(agentId);
  }

  @Post()
  @ApiOperation({ summary: '새로운 예약 실행 생성' })
  @ApiResponse({ status: 201, description: '생성 성공', type: Schedule })
  create(@Body() createScheduleDto: CreateScheduleDto): Schedule {
    return this.schedulesService.create(createScheduleDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '예약 실행 업데이트' })
  @ApiResponse({ status: 200, description: '업데이트 성공', type: Schedule })
  @ApiResponse({ status: 404, description: '예약 실행이 존재하지 않음' })
  update(@Param('id') id: string, @Body() updateScheduleDto: Partial<CreateScheduleDto>): Schedule | undefined {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '예약 실행 삭제' })
  @ApiResponse({ status: 204, description: '삭제 성공' })
  @ApiResponse({ status: 404, description: '예약 실행이 존재하지 않음' })
  remove(@Param('id') id: string): void {
    this.schedulesService.remove(id);
  }
} 