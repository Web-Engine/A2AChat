import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskStatus } from '../../entities/task.entity';

export type TaskDocument = TaskSchemaClass & Document;

@Schema({ timestamps: true })
export class TaskSchemaClass {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  agentId: string;

  @Prop({ required: true, enum: Object.values(TaskStatus), default: TaskStatus.SUBMITTED })
  status: TaskStatus;

  @Prop({ type: Object, default: [] })
  messages: any[];

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(TaskSchemaClass); 