import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransactionProducer } from 'src/transaction/jobs/transaction.producer';
import Web3 from 'web3';
import ERC20 from 'src/contract/abi/erc20.json';
import abiDecoder from 'abi-decoder';

@Injectable()
export class Web3Service {
  private web3Instance: Web3;
  public transaction: Array<any>;

  constructor(
    private configService: ConfigService,
    private transactionProducer: TransactionProducer,
  ) {
    this.web3Instance = new Web3(
      this.configService.get<string>('PROVIDER_PRIMARY_HTTPS'),
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
      const tx = await this.getTransaction(hash);
      this.transactionProducer.listener(tx);
    });
  }

  async getTransactionFromBlock(blockNumber: number, indexNumber: number) {
    return await this.web3Instance.eth.getTransactionFromBlock(
      blockNumber,
      indexNumber,
    );
  }

  async readInput(input: string, address: string) {
    try {
      const ABI = JSON.parse(JSON.stringify(ERC20));
      abiDecoder.addABI(ABI);
      const transaction = abiDecoder.decodeMethod(input);
      const contract = new this.web3Instance.eth.Contract(ABI, address);
      transaction.symbol = await contract.methods
        .symbol()
        .call()
        .then((result) => result);

      transaction.name = await contract.methods
        .name()
        .call()
        .then((result) => result);

      transaction.decimals = await contract.methods
        .decimals()
        .call()
        .then((result) => result);

      return transaction;
    } catch (err) {
      throw new Error(err);
    }
  }
}
