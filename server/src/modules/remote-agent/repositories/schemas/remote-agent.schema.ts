import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RemoteAgent } from '../../entities/remote-agent.entity';

export type RemoteAgentDocument = RemoteAgentSchemaClass & Document;

@Schema({ timestamps: true })
export class RemoteAgentSchemaClass {
  @Prop({ required: true })
  agentId: string;

  @Prop({ required: true })
  endpoint: string;

  @Prop()
  apiKey?: string;

  @Prop({ required: true, enum: ['connected', 'disconnected', 'error'], default: 'disconnected' })
  status: 'connected' | 'disconnected' | 'error';

  @Prop()
  lastConnectedAt?: Date;

  @Prop()
  lastError?: string;
}

export const RemoteAgentSchema = SchemaFactory.createForClass(RemoteAgentSchemaClass); 