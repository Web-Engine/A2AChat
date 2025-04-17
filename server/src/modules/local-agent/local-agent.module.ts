import { Module } from '@nestjs/common';
import { LocalAgentService } from './services/local-agent.service';
import { LocalAgentRepository } from './repositories/local-agent.repository';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TaskModule],
  providers: [LocalAgentService, LocalAgentRepository],
  exports: [LocalAgentService],
})
export class LocalAgentModule {} 