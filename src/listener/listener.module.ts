import { Module } from '@nestjs/common';
import { ListenerController } from './listener.controller';
import { BlockService } from 'src/block/block.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from 'src/block/entities/block.entity';
import { Web3Service } from 'src/web3/web3.service';
import { TransactionProducer } from 'src/transaction/jobs/transaction.producer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([Block]),
    BullModule.registerQueue({
      name: 'transactions-queue',
    }),
  ],
  controllers: [ListenerController],
  providers: [
    BlockService,
    TransactionService,
    Web3Service,
    TransactionProducer,
  ],
})
export class ListenerModule {}
