import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateSupportedTokenDto } from './dto/create-supported-token.dto';
import { SupportedToken } from './entities/supported-token.entity';

@Injectable()
export class SupportedTokensService {
  constructor(
    @InjectRepository(SupportedToken)
    private supportedTokenRepository: Repository<SupportedToken>,
  ) {}

  create(createSupportedTokenDto: CreateSupportedTokenDto) {
    const supportedTokenDTO = this.supportedTokenRepository.create(
      createSupportedTokenDto,
    );
    console.log(supportedTokenDTO);

    return this.supportedTokenRepository.upsert(supportedTokenDTO, {
      conflictPaths: ['symbol'],
      skipUpdateIfNoValuesChanged: true,
    });
  }

  async findAll() {
    return this.supportedTokenRepository.find({
      select: ['name', 'symbol', 'address', 'decimals'],
    });
  }

  async findOne(symbolOrName: string) {
    return this.supportedTokenRepository.findOne({
      where: [
        {
          symbol: ILike(symbolOrName),
          name: ILike(symbolOrName),
        },
      ],
      select: ['name', 'symbol', 'address', 'decimals'],
    });
  }
}
