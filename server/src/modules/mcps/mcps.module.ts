import { Module } from '@nestjs/common';
import { McpsController } from './controllers/mcps.controller';
import { McpsService } from './services/mcps.service';
import { McpsRepository } from './services/mcps.repository';

@Module({
  controllers: [McpsController],
  providers: [McpsService, McpsRepository],
})
export class McpsModule {}