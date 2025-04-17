import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RemoteAgentController } from './controllers/remote-agent.controller';
import { RemoteAgentService } from './services/remote-agent.service';
import { RemoteAgentRepository } from './repositories/remote-agent.repository';
import { RemoteAgentSchemaClass, RemoteAgentSchema } from './repositories/schemas/remote-agent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RemoteAgentSchemaClass.name, schema: RemoteAgentSchema }]),
  ],
  controllers: [RemoteAgentController],
  providers: [RemoteAgentService, RemoteAgentRepository],
  exports: [RemoteAgentService],
})
export class RemoteAgentModule {} 