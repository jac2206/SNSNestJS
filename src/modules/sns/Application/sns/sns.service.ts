import { SNS } from "aws-sdk";
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { Injectable } from '@nestjs/common';
import { EventSendSNS } from '../../Domain/Entities/EvenSendSNS';
import { Mensaje } from '../../Domain/Entities/Mensaje';
import { v4 as uuidv4 } from 'uuid';

// Set the AWS Region.
const REGION = "us-east-1"; //e.g. "us-east-1"
const credentials = {
  region: REGION,
  credentials: {
    accessKeyId: 'AKIAXGXL3RJCR7256FOL',
    secretAccessKey: '3L9Du2qgk6mOkW/ER6ixjkqNDa39B241b2ugZMhh'
  }
};
const snsClient = new SNSClient(credentials);

// const messageAttributes = {
//     event: {
//         DataType: 'string',
//         StringValue: 'send.sns'
//     }
//   };

//   const messageAttributes: Record<string, any> = {
//     'first': 123,
//     'second': 456
// }
const messageAttribute = {
    "event":{
        DataType:'String',
        StringValue:'send.sns',
    }
};


@Injectable()
export class SnsService {
  private client: AWS.SNS;

  constructor() {
    this.client = new SNS({
      region: "us-east-1",
      // endpoint: "http://localhost:3000",
    });
  }
  async sendEventSNSFIFOTopicAWSSDK(event:EventSendSNS):Promise<EventSendSNS>{
    const idRandom =  uuidv4().toString();
    var params = {
        // Type: "event",
        Message: JSON.stringify(event), // MESSAGE_TEXT
        TopicArn: "arn:aws:sns:us-east-1:495489616453:MicroServiceNestJS.fifo", //TOPIC_ARN
        Subject: 'event',
        MessageDeduplicationId: 'event'.concat(idRandom) ,
        MessageGroupId: idRandom
        // MessageAttributes: JSON.stringify(messageAttributes)
      };
    const data = await this.client.publish(params).promise();
    console.log(data);   
    return event;
}
    async sendSNSTopic(mensaje:Mensaje):Promise<Mensaje>{
        var params = {
            // Type: "event",
            Message: JSON.stringify(mensaje), // MESSAGE_TEXT
            TopicArn: "arn:aws:sns:us-east-1:495489616453:MicroservicioNestJS", //TOPIC_ARN
            Subject: 'event',
            MessageAttributes: messageAttribute
          };
          const data = await snsClient.send(new PublishCommand(params));
          console.log(data);   
        return mensaje;
    }
    async sendEventSNSTopic(event:EventSendSNS):Promise<EventSendSNS>{
        var params = {
            // Type: "event",
            Message: JSON.stringify(event), // MESSAGE_TEXT
            TopicArn: "arn:aws:sns:us-east-1:495489616453:MicroservicioNestJS", //TOPIC_ARN
            Subject: 'event',
            // MessageAttributes: JSON.stringify(messageAttributes)
          };
        const data = await snsClient.send(new PublishCommand(params));
        console.log(data);   
        return event;
    }
    async sendEventSNSFIFOTopic(event:EventSendSNS):Promise<EventSendSNS>{
      const idRandom =  uuidv4().toString();
      var params = {
          // Type: "event",
          Message: JSON.stringify(event), // MESSAGE_TEXT
          TopicArn: "arn:aws:sns:us-east-1:495489616453:MicroServiceNestJS.fifo", //TOPIC_ARN
          Subject: 'event',
          MessageDeduplicationId: 'event'.concat(idRandom) ,
          MessageGroupId: idRandom
          // MessageAttributes: JSON.stringify(messageAttributes)
        };
      const data = await snsClient.send(new PublishCommand(params));
      console.log(data);   
      return event;
  }
}
