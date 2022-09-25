import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnsModule } from './modules/sns/sns.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from './modules/sns/Infrastructure/Config/enviroments';
import config from './modules/sns/Infrastructure/Config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV],
      load: [config],
      isGlobal: true,
    }),
    SnsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
