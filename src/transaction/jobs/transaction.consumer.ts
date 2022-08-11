import {
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Web3Service } from 'src/web3/web3.service';

@Processor('transactions-queue')
export class TransactionConsumer {
  constructor(private web3Service: Web3Service) {}

  @Process('transaction-listener')
  async transactionHashJob(hash) {
    const { data } = hash;
    const transaction = await this.web3Service.getTransaction(data);

    // Is ETH
    if (transaction.input == '0x') {
      console.log('Transaction for ETH');
    } else {
      const decoded = await this.web3Service.readInput(
        transaction.input,
        transaction.to,
      );
      transaction.input = decoded;
      console.log(`Transaction for ${decoded.symbol}`);
      console.log('Transaction', transaction);
    }
  }

  @OnQueueCompleted()
  onCompleted() {
    console.log('Completed');
  }

  @OnQueueProgress()
  onProgress() {
    console.log('On progress...');
  }

  @OnQueueError()
  onQueueError() {
    console.log('Error');
  }

  @OnQueueFailed()
  onQueueFailed(err) {
    console.log('Failed', err.failedReason);
  }
}
