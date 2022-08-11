import {
  OnQueueCompleted,
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
      console.log(transaction);
    } else {
      console.log('Transaction for other Token');
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
}
