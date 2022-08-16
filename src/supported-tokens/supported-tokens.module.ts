import { Module } from '@nestjs/common';
import { SupportedTokensService } from './supported-tokens.service';
import { SupportedTokensController } from './supported-tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportedToken } from './entities/supported-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupportedToken])],
  controllers: [SupportedTokensController],
  providers: [SupportedTokensService],
})
export class SupportedTokensModule {}
