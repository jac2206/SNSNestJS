import { Module } from '@nestjs/common';
import { SnsService } from './Application/sns/sns.service';
import { SnsController } from './Infrastructure/Controllers/sns/sns.controller';

@Module({  
    imports: [],
    controllers: [SnsController],
    providers: [SnsService],
})
export class SnsModule {}
