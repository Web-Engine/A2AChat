import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleController } from './controllers/schedule.controller';
import { ScheduleService } from './services/schedule.service';
import { ScheduleRepository } from './repositories/schedule.repository';
import { ScheduleSchemaClass, ScheduleSchema } from './repositories/schemas/schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ScheduleSchemaClass.name, schema: ScheduleSchema }]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository],
  exports: [ScheduleService],
})
export class ScheduleModule {} 