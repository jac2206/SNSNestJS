process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
console.log('NODE_ENV:', process.env.NODE_ENV);
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import config from './modules/sns/Infrastructure/Config/config';
import { validateConfigValues } from './modules/sns/Infrastructure/Config/validation-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // config(app, configService);
  validateConfigValues(configService);
  const port = configService.get<number>('AppConfiguration.port');
  Logger.log(
    `(): Server running on port: ${port} with environment: ${process.env.NODE_ENV}`,
  );
  await app.listen(3000);
}
bootstrap();
