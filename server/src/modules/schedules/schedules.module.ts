import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulesController } from './controllers/schedules.controller';
import { SchedulesService } from './services/schedules.service';
import { SchedulesRepository } from './repositories/schedules.repository';
import { ScheduleSchemaClass, ScheduleSchema } from './repositories/schemas/schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ScheduleSchemaClass.name, schema: ScheduleSchema }]),
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService, SchedulesRepository],
  exports: [SchedulesService],
})
export class SchedulesModule {} 