import { Injectable } from '@nestjs/common';
import { connect } from 'amqplib';
@Injectable()
export class RabbitMqService {
  private connection: any;
  private channel: any;

  async connect() {
    this.connection = await connect('amqp://localhost:5672');
    this.channel = await this.connection.createChannel();
  }

  async publishMessage(queue: string, mess: any) {
    await this.channel.assertQueue(queue);
    await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(mess)));
  }
  async consumeMessage(queue: string, callback: (mess: any) => void) {
    await this.channel.assereQueue(queue);
    await this.channel.consume(queue, (mess) => {
      callback(JSON.parse(mess));
      this.channel.ack(mess);
    });
  }
}
