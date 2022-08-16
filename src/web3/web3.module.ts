import { Module } from '@nestjs/common';
import { Web3Service } from './web3.service';

import { TransactionProducer } from 'src/transaction/jobs/transaction.producer';
import { BullModule } from '@nestjs/bull';
import { TransactionConsumer } from 'src/transaction/jobs/transaction.consumer';
import { TransactionService } from 'src/transaction/transaction.service';
import { SupportedTokensService } from 'src/supported-tokens/supported-tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportedToken } from 'src/supported-tokens/entities/supported-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupportedToken]),
    BullModule.registerQueue({
      name: 'transactions-queue',
    }),
  ],

  providers: [
    Web3Service,
    TransactionProducer,
    TransactionConsumer,
    TransactionService,
    SupportedTokensService,
  ],
})
export class Web3Module {}
