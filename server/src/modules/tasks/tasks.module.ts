import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './services/tasks.service';
import { TasksRepository } from './repositories/tasks.repository';
import { TaskSchemaClass, TaskSchema } from './repositories/schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TaskSchemaClass.name, schema: TaskSchema }]),
  ],
  providers: [TasksService, TasksRepository],
  exports: [TasksService],
})
export class TasksModule {} 