import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { Injectable } from '@nestjs/common';
import { EventSendSNS } from '../../Domain/Entities/EvenSendSNS';
import { Mensaje } from '../../Domain/Entities/Mensaje';
import { v4 as uuidv4 } from 'uuid';

// Set the AWS Region.
const REGION = "us-east-1"; //e.g. "us-east-1"
// Create SNS service object.
// const credentials = {
//     region: REGION,
//     credentials: {
//       accessKeyId: 'AKIAXGXL3RJCRI54KJFH',
//       secretAccessKey: 'MNriflbKiCBb/vo7+GKrwuLOoaFs2s/1Y4sCn9xa'
//     }
//   };
const credentials = {
  region: REGION,
  credentials: {
    accessKeyId: 'AKIAXGXL3RJCR7256FOL',
    secretAccessKey: '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'
  }
};
// const snsClient = new SNSClient({ region: REGION });
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
    async sendSNSTopic(mensaje:Mensaje):Promise<Mensaje>{
        // const messageAttribs = [
        //     {
        //         "name":"event",
        //         "value":"send.sns"
        //     }
        // ]
        //Build strange attributes object
        // let messageAttribsObj = {};
        // for (var i = 0; i < messageAttribs.length; i++) {
        //     messageAttribsObj[messageAttribs[i].name] = {};
        //     messageAttribsObj[messageAttribs[i].name].DataType = "String";
        //     messageAttribsObj[messageAttribs[i].name].StringValue = messageAttribs[i].value;
        // }
        // console.log(messageAttribsObj[0])
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
