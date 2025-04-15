import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { McpsService } from '../services/mcps.service';
import { Mcp } from '../entities/mcp.entity';
import { CreateMcpDto } from '../dtos/create-mcp.dto';

@ApiTags('Mcp')
@Controller('mcps')
export class McpsController {
  constructor(private readonly mcpsService: McpsService) {}

  @Get()
  @ApiOperation({ summary: '모든 Mcp 설정 조회' })
  @ApiResponse({ status: 200, description: '성공', type: [Mcp] })
  findAll(): Mcp[] {
    return this.mcpsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 Mcp 설정 조회' })
  @ApiResponse({ status: 200, description: '성공', type: Mcp })
  @ApiResponse({ status: 404, description: 'Mcp 설정이 존재하지 않음' })
  findOne(@Param('id') id: string): Mcp | undefined {
    return this.mcpsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '새로운 Mcp 설정 생성' })
  @ApiResponse({ status: 201, description: '생성 성공', type: Mcp })
  create(@Body() createMcpDto: CreateMcpDto): Mcp {
    return this.mcpsService.create(createMcpDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mcp 설정 업데이트' })
  @ApiResponse({ status: 200, description: '업데이트 성공', type: Mcp })
  @ApiResponse({ status: 404, description: 'Mcp 설정이 존재하지 않음' })
  update(@Param('id') id: string, @Body() updateMcpDto: Partial<CreateMcpDto>): Mcp | undefined {
    return this.mcpsService.update(id, updateMcpDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Mcp 설정 삭제' })
  @ApiResponse({ status: 204, description: '삭제 성공' })
  @ApiResponse({ status: 404, description: 'Mcp 설정이 존재하지 않음' })
  remove(@Param('id') id: string): void {
    this.mcpsService.remove(id);
  }
} 