import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulesController } from './controllers/schedules.controller';
import { SchedulesService } from './services/schedules.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {} 