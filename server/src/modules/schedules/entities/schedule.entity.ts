import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
  @ApiProperty({
    description: '예약 실행의 고유 식별자',
    format: 'uuid',
  })
  @Prop({ required: true, unique: true })
  id: string;

  @ApiProperty({
    description: '실행할 Agent의 ID',
    format: 'uuid',
  })
  @Prop({ required: true })
  agentId: string;

  @ApiProperty({
    description: '실행 주기를 나타내는 Cron 표현식',
  })
  @Prop({ required: true })
  cronExpression: string;

  @ApiProperty({
    description: '예약 실행에 대한 설명',
    required: false,
  })
  @Prop()
  description?: string;

  @ApiProperty({
    description: '예약 실행 활성화 여부',
    default: true,
  })
  @Prop({ required: true, default: true })
  enabled: boolean;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule); 