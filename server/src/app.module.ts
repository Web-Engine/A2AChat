import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentsModule } from './modules/agent/agents.module';
import { RemoteAgentModule } from './modules/remote-agent/remote-agent.module';
import { SchedulesModule } from './modules/schedule/schedules.module';
import { TasksModule } from './modules/task/tasks.module';
import { ChatModule } from './modules/chat/chat.module';
import { McpsModule } from './modules/mcps/mcps.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('mongodb.uri');
        if (!uri) {
          throw new Error('MONGODB_URI 환경 변수가 설정되지 않았습니다.');
        }
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    AgentsModule,
    RemoteAgentModule,
    SchedulesModule,
    TasksModule,
    ChatModule,
    McpsModule,
  ],
})
export class AppModule {}
