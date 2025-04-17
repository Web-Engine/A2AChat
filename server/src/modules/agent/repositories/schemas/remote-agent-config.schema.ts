import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class RemoteAgentConfigSchema {
  @Prop({ required: true })
  endpoint: string;

  @Prop()
  apiKey?: string;
}

export const RemoteAgentConfigSchemaFactory = SchemaFactory.createForClass(RemoteAgentConfigSchema); 