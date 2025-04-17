import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AgentType } from '../../entities/agent.entity';

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
}

export const AgentSchema = SchemaFactory.createForClass(AgentSchemaClass); 