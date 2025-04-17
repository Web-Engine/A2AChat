import { Module } from '@nestjs/common';
import { McpController } from './controllers/mcp.controller';
import { McpService } from './services/mcp.service';
import { McpRepository } from './services/mcp.repository';

@Module({
  controllers: [McpController],
  providers: [McpService, McpRepository],
})
export class McpModule {}