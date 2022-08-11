import { Module } from '@nestjs/common';
import { Web3Service } from './web3.service';

import { TransactionProducer } from 'src/transaction/jobs/transaction.producer';
import { BullModule } from '@nestjs/bull';
import { TransactionConsumer } from 'src/transaction/jobs/transaction.consumer';
import { TransactionService } from 'src/transaction/transaction.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'transactions-queue',
    }),
  ],

  providers: [
    Web3Service,
    TransactionProducer,
    TransactionConsumer,
    TransactionService,
  ],
})
export class Web3Module {}
