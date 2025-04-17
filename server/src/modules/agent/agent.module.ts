import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentController } from './controllers/agent.controller';
import { AgentService } from './services/agent.service';
import { AgentRepository } from './repositories/agent.repository';
import { AgentSchemaClass, AgentSchema } from './repositories/schemas/agent.schema';
import { RemoteAgentModule } from '../remote-agent/remote-agent.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AgentSchemaClass.name, schema: AgentSchema }]),
    RemoteAgentModule,
  ],
  controllers: [AgentController],
  providers: [AgentService, AgentRepository],
  exports: [AgentService],
})
export class AgentModule {} 