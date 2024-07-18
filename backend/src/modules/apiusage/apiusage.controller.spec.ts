import { Test, TestingModule } from '@nestjs/testing';
import { ApiusageController } from './apiusage.controller';

describe('ApiusageController', () => {
  let controller: ApiusageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiusageController],
    }).compile();

    controller = module.get<ApiusageController>(ApiusageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
