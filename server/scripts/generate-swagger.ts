import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import { writeFileSync } from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('A2AChat API')
    .setDescription('Agent 간 상호작용을 위한 API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const outputPath = path.resolve(__dirname, '../../oas/swagger.json');
  writeFileSync(outputPath, JSON.stringify(document, null, 2), { encoding: 'utf8'});

  await app.close();
}

bootstrap();
