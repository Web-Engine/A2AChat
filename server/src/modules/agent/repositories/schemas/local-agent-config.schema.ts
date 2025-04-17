import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class LocalAgentConfigSchema {
  @Prop({ required: true })
  modelName: string;

  @Prop({ required: true })
  systemPrompt: string;

  @Prop({ type: [String], required: true })
  knowledgeBases: string[];

  @Prop({ type: [String], required: true })
  mcpTools: string[];
}

export const LocalAgentConfigSchemaFactory = SchemaFactory.createForClass(LocalAgentConfigSchema); 