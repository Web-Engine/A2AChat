import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentsModule } from './modules/agents/agents.module';
import { McpsModule } from './modules/mcps/mcps.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { ChatModule } from './modules/chat/chat.module';
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
    McpsModule,
    SchedulesModule,
    ChatModule,
  ],
})
export class AppModule {}
