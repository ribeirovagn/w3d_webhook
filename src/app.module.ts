import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { WebhookModule } from './webhook/webhook.module';
import { BlockModule } from './block/block.module';
import { Web3Module } from './web3/web3.module';
import { AddressModule } from './address/address.module';
import { TransactionModule } from './transaction/transaction.module';
import { ListenerModule } from './listener/listener.module';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    WebhookModule,
    BlockModule,
    Web3Module,
    AddressModule,
    TransactionModule,
    ListenerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
