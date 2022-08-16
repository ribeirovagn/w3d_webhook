import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlockService } from 'src/block/block.service';
import { Web3Service } from 'src/web3/web3.service';

@Controller('listener')
export class ListenerController {
  private lastBlockNumber;
  private web3Block;
  private isSync = false;
  private block;

  constructor(
    private readonly configService: ConfigService,
    private readonly blockService: BlockService,
    private readonly web3Service: Web3Service,
  ) {
    this.init();
  }

  async init() {
    setTimeout(async () => {
      await this.getLastBlockNumber();
      if (!this.isSync && this.block.transactions) {
        this.web3Service.setTransactions(this.block.transactions);
        this.incrementBlockNumber(this.lastBlockNumber.number);
        console.log('Web3 BlockNumber', this.web3Block);
        console.log('App BlockNumber', this.lastBlockNumber.number);
      }
      this.init();
    }, this.configService.get<number>('TIME_TO_READ_BLOCK'));
  }

  async getLastBlockNumber() {
    this.web3Block = await this.web3Service.getBlockNumber();
    this.lastBlockNumber = await this.blockService.findLast();

    if (!this.lastBlockNumber) {
      console.log(`First start app on block ${this.web3Block}`);
      this.lastBlockNumber = await this.incrementBlockNumber(this.web3Block);
    }

    if (this.web3Block == this.lastBlockNumber.number) {
      this.isSync = true;
      console.log('Blockchain is sync');
    } else if (this.web3Block > this.lastBlockNumber.number) {
      this.isSync = false;
      this.block = await this.web3Service.getBlock(this.lastBlockNumber.number);
      console.log(
        `Reading block ${this.lastBlockNumber.number} on the blockchain...`,
      );
    }
  }

  async incrementBlockNumber(number: number) {
    return this.blockService.incrementBlockValue(number + 1);
  }
}
