import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleDocument = ScheduleSchemaClass & Document;

@Schema({ timestamps: true })
export class ScheduleSchemaClass {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  cron: string;

  @Prop({ required: true })
  enabled: boolean;

  @Prop({ type: Object })
  data: any;
}

export const ScheduleSchema = SchemaFactory.createForClass(ScheduleSchemaClass); 