import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentsModule } from './modules/agents/agents.module';
import { McpsModule } from './modules/mcps/mcps.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://root:example@localhost:27017/a2achat?authSource=admin'),
    AgentsModule,
    McpsModule,
    SchedulesModule,
    ChatModule,
  ],
})
export class AppModule {}
