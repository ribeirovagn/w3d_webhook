import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class TransactionProducer {
  constructor(@InjectQueue('transactions-queue') private queue: Queue) {}

  async listener(transactionHash: any) {
    this.queue.add('transaction-listener', transactionHash);
  }
}
