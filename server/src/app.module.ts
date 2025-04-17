import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentModule } from './modules/agent/agent.module';
import { RemoteAgentModule } from './modules/remote-agent/remote-agent.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { TaskModule } from './modules/task/task.module';
import { McpModule } from './modules/mcp/mcp.module';
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
    AgentModule,
    RemoteAgentModule,
    ScheduleModule,
    TaskModule,
    McpModule,
  ],
})
export class AppModule {}
