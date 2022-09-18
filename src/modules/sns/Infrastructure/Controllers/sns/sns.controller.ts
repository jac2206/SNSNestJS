import { Body, Controller, Post } from '@nestjs/common';
import { SnsService } from 'src/modules/sns/Application/sns/sns.service';
import { EventSendSNS } from 'src/modules/sns/Domain/Entities/EvenSendSNS';
import { Mensaje } from 'src/modules/sns/Domain/Entities/Mensaje';

@Controller('sns')
export class SnsController {
    constructor(private readonly snsService:SnsService) {}
    @Post()
    async EnviarSNS(@Body() mensaje: Mensaje): Promise<Mensaje> {
        this.snsService.sendSNSTopic(mensaje);
        return mensaje;
    }
    @Post('event')
    async EnviarEventoSNS(@Body() event: EventSendSNS): Promise<EventSendSNS> {
        this.snsService.sendEventSNSTopic(event);
        return event;
    }
    @Post('sqsevent')
    async RecibirEventoSQS(@Body() event: EventSendSNS): Promise<EventSendSNS> {
        console.log(event);
        return event;
    }
}
