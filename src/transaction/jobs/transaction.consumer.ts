import {
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { CreateSupportedTokenDto } from 'src/supported-tokens/dto/create-supported-token.dto';
import { SupportedTokensService } from 'src/supported-tokens/supported-tokens.service';
import { Web3Service } from 'src/web3/web3.service';

@Processor('transactions-queue')
export class TransactionConsumer {
  constructor(
    private web3Service: Web3Service,
    private supportedTokensService: SupportedTokensService,
  ) {}

  private count = 0;

  @Process('transaction-listener')
  async transactionHashJob(hash) {
    const { data } = hash;
    const transaction = data;
    // const transaction: any = await this.web3Service.getTransaction(data);

    const supportedToken = new CreateSupportedTokenDto();
    // Is ETH
    if (transaction.input == '0x') {
      transaction.input = {
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: 18,
      };
    } else {
      const decoded = await this.web3Service.readInput(
        transaction.input,
        transaction.to,
      );
      transaction.input = decoded;
      supportedToken.address = transaction.to;
    }

    supportedToken.decimals = transaction.input.decimals;
    supportedToken.symbol = transaction.input.symbol;
    supportedToken.name = transaction.input.name;

    this.supportedTokensService.create(supportedToken);
    console.log('transaction', transaction);

    console.log('Counter queue', this.count++);
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
