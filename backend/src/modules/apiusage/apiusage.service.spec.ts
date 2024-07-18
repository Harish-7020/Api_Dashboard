import { Test, TestingModule } from '@nestjs/testing';
import { ApiusageService } from './apiusage.service';

describe('ApiusageService', () => {
  let service: ApiusageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiusageService],
    }).compile();

    service = module.get<ApiusageService>(ApiusageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
