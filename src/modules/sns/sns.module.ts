import { Module } from '@nestjs/common';
import { SnsService } from './Application/sns/sns.service';
import { SnsController } from './Infrastructure/Controllers/sns/sns.controller';
import * as AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIAXGXL3RJCRI54KJFH',
    secretAccessKey: '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',
});

@Module({  
    imports: [],
    controllers: [SnsController],
    providers: [SnsService],
})
export class SnsModule {}
