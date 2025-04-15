import { Module } from '@nestjs/common';
import { McpsController } from './controllers/mcps.controller';
import { McpsService } from './services/mcps.service';

@Module({
  controllers: [McpsController],
  providers: [McpsService],
})
export class McpsModule {}