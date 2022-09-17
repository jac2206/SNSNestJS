import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnsModule } from './modules/sns/sns.module';

@Module({
  imports: [SnsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
