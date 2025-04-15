import { Module } from '@nestjs/common';
import { AgentsController } from './controllers/agents.controller';
import { AgentsService } from './services/agents.service';
import { AgentsRepository } from './services/agents.repository';

@Module({
  controllers: [AgentsController],
  providers: [AgentsService, AgentsRepository],
})
export class AgentsModule {} 