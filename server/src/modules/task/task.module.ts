import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { TaskRepository } from './repositories/task.repository';
import { TaskSchemaClass, TaskSchema } from './repositories/schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TaskSchemaClass.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskService],
})
export class TaskModule {} 