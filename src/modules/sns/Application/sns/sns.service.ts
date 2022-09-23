import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { Injectable } from '@nestjs/common';
import { EventSendSNS } from '../../Domain/Entities/EvenSendSNS';
import { Mensaje } from '../../Domain/Entities/Mensaje';
import { v4 as uuidv4 } from 'uuid';
import { SNS } from 'aws-sdk';

// Set the AWS Region.
const REGION = 'us-east-1'; //e.g. "us-east-1"
const credentials = {
  region: REGION,
  credentials: {
    accessKeyId: 'AKIAXGXL3RJCR7256FOL',
    secretAccessKey: '3L9Du2qgk6mOkW/ER6ixjkqNDa39B241b2ugZMhh',
  },
};
// const snsClient = new SNSClient({ region: REGION });
const snsClient = new SNSClient(credentials);

// const messageAttributes = {
//     event: {
//         DataType: 'string',
//         StringValue: 'send.sns'
//     }
//   };

const messageAttribute = {
  event: {
    DataType: 'String',
    StringValue: 'send.sns',
  },
};

const MessageAttributes = {
  Title: {
    DataType: 'String',
    StringValue: 'The Whistler',
  },
  Author: {
    DataType: 'String',
    StringValue: 'John Grisham',
  },
  WeeksOn: {
    DataType: 'Number',
    StringValue: '6',
  },
};

@Injectable()
export class SnsService {
  private client: AWS.SNS;
  constructor() {
    this.client = new SNS({
      region: 'us-east-1',
      // endpoint: 'http://localhost:3000',
      // endpoint:
      //   configService.stage === Stage.LOCAL
      //     ? "http://localhost:4566"
      //     : undefined,
    });
  }
  async sendEventSNSFIFOTopicSinCredenciales(
    event: EventSendSNS,
  ): Promise<EventSendSNS> {
    const idRandom = uuidv4().toString();
    const params = {
      // Type: "event",
      Message: JSON.stringify(event), // MESSAGE_TEXT
      TopicArn: 'arn:aws:sns:us-east-1:495489616453:MicroServiceNestJS.fifo', //TOPIC_ARN
      Subject: 'event',
      MessageDeduplicationId: 'event'.concat(idRandom),
      MessageGroupId: idRandom,
      // MessageAttributes: JSON.stringify(messageAttributes)
    };
    const data = await this.client.publish(params).promise();
    console.log(data);
    return event;
  }
  async sendSNSTopic(mensaje: Mensaje): Promise<Mensaje> {
    const params = {
      Message: JSON.stringify(mensaje), // MESSAGE_TEXT
      TopicArn: 'arn:aws:sns:us-east-1:495489616453:MicroservicioNestJS', //TOPIC_ARN
      Subject: 'event',
      MessageAttributes: MessageAttributes,
    };
    const data = await snsClient.send(new PublishCommand(params));
    console.log(data);
    return mensaje;
  }
  async sendEventSNSTopic(event: EventSendSNS): Promise<EventSendSNS> {
    const params = {
      // Type: "event",
      Message: JSON.stringify(event), // MESSAGE_TEXT
      TopicArn: 'arn:aws:sns:us-east-1:495489616453:MicroservicioNestJS', //TOPIC_ARN
      Subject: 'event',
      MessageAttributes: messageAttribute,
      // MessageAttributes: JSON.stringify(messageAttributes)
    };
    const data = await snsClient.send(new PublishCommand(params));
    console.log(data);
    return event;
  }
  async sendEventSNSFIFOTopic(event: EventSendSNS): Promise<EventSendSNS> {
    const idRandom = uuidv4().toString();
    const params = {
      // Type: "event",
      Message: JSON.stringify(event), // MESSAGE_TEXT
      TopicArn: 'arn:aws:sns:us-east-1:495489616453:MicroServiceNestJS.fifo', //TOPIC_ARN
      Subject: 'event',
      MessageDeduplicationId: 'event'.concat(idRandom),
      MessageGroupId: idRandom,
      // MessageAttributes: JSON.stringify(messageAttributes)
    };
    const data = await snsClient.send(new PublishCommand(params));
    console.log(data);
    return event;
  }
}
