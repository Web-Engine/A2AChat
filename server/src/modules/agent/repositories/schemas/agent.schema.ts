import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AgentType } from '../../entities/agent-type.enum';
import { LocalAgentConfigSchema } from './local-agent-config.schema';
import { RemoteAgentConfigSchema } from './remote-agent-config.schema';

export type AgentDocument = AgentSchemaClass & Document;

@Schema({ timestamps: true })
export class AgentSchemaClass {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, enum: Object.values(AgentType) })
  type: AgentType;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: LocalAgentConfigSchema })
  localConfig?: LocalAgentConfigSchema;

  @Prop({ type: RemoteAgentConfigSchema })
  remoteConfig?: RemoteAgentConfigSchema;
}

export const AgentSchema = SchemaFactory.createForClass(AgentSchemaClass); 