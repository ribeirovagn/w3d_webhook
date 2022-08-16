import { Test, TestingModule } from '@nestjs/testing';
import { SupportedTokensService } from './supported-tokens.service';

describe('SupportedTokensService', () => {
  let service: SupportedTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupportedTokensService],
    }).compile();

    service = module.get<SupportedTokensService>(SupportedTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
