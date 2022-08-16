import { Test, TestingModule } from '@nestjs/testing';
import { SupportedTokensController } from './supported-tokens.controller';
import { SupportedTokensService } from './supported-tokens.service';

describe('SupportedTokensController', () => {
  let controller: SupportedTokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportedTokensController],
      providers: [SupportedTokensService],
    }).compile();

    controller = module.get<SupportedTokensController>(SupportedTokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
