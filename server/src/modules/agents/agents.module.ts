import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentsController } from './controllers/agents.controller';
import { AgentsService } from './services/agents.service';
import { AgentsRepository } from './repositories/agents.repository';
import { AgentSchemaClass, AgentSchema } from './repositories/schemas/agent.schema';
import { RemoteAgentModule } from '../remote-agent/remote-agent.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AgentSchemaClass.name, schema: AgentSchema }]),
    RemoteAgentModule,
  ],
  controllers: [AgentsController],
  providers: [AgentsService, AgentsRepository],
  exports: [AgentsService],
})
export class AgentsModule {} 