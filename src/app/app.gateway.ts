import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { AppService } from 'src/app.service'
import { Prisma } from '@prisma/client'

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private appService: AppService) { }

    handleConnection(client: Socket) {
        console.log(`Connection ${client.id}`)
    }

    handleDisconnect(client: Socket) {
        console.log(`Diconnect ${client.id}`)
    }

    afterInit(server: any) {
        console.log(server)
    }

    @WebSocketServer() server: Server
    @SubscribeMessage('sendMessage')
    async handleSendMessage(client: Socket, payload: Prisma.ChatCreateInput): Promise<void> {
        await this.appService.createMessage(payload)
        this.server.emit('recMessage', payload)
    }
}
