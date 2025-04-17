import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Task, TaskStatus, Message } from '../../entities/task.entity';

export type TaskDocument = Task & Document;

@Schema()
export class TaskSchemaClass {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  agentId: string;

  @Prop({ required: true, enum: TaskStatus })
  status: TaskStatus;

  @Prop({ type: [Object], default: [] })
  messages: Message[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(TaskSchemaClass); 