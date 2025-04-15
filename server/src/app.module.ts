import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentsModule } from './modules/agents/agents.module';
import { McpsModule } from './modules/mcps/mcps.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [AgentsModule, McpsModule, SchedulesModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
