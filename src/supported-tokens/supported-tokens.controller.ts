import { Controller, Get, Param } from '@nestjs/common';
import { SupportedTokensService } from './supported-tokens.service';

@Controller('supported-tokens')
export class SupportedTokensController {
  constructor(
    private readonly supportedTokensService: SupportedTokensService,
  ) {}

  @Get()
  findAll() {
    return this.supportedTokensService.findAll();
  }

  @Get(':symbolOrName')
  findOne(@Param('symbolOrName') symbolOrName: string) {
    return this.supportedTokensService.findOne(symbolOrName);
  }
}
