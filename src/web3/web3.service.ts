import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransactionProducer } from 'src/transaction/jobs/transaction.producer';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
  private web3Instance: Web3;
  public transaction: Array<any>;

  constructor(
    private configService: ConfigService,
    private transactionProducer: TransactionProducer,
  ) {
    this.web3Instance = new Web3(
      this.configService.get<string>('PROVIDER_INFURA_HTTPS'),
    );

    if (!this.web3Instance.currentProvider) {
      this.web3Instance = new Web3(
        this.configService.get<string>('PROVIDER_SECONDARY_HTTPS'),
      );
    }
  }

  async getBlockNumber(): Promise<number> {
    return await this.web3Instance.eth.getBlockNumber();
  }

  async getBlock(id: number) {
    return await this.web3Instance.eth.getBlock(id);
  }

  async getTransaction(transactionHash: string) {
    return await this.web3Instance.eth.getTransaction(transactionHash);
  }

  async setTransactions(transactionsHash: string[]) {
    this.transaction = [];
    transactionsHash.forEach(async (hash: string) => {
      this.transactionProducer.listener(hash);
    });
  }

  async getTransactionFromBlock(blockNumber: number, indexNumber: number) {
    return await this.web3Instance.eth.getTransactionFromBlock(
      blockNumber,
      indexNumber,
    );
  }
}
