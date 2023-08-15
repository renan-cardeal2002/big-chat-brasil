import { Test, TestingModule } from '@nestjs/testing';
import { ErrosService } from './erros.service';

describe('ErrosService', () => {
  let service: ErrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrosService],
    }).compile();

    service = module.get<ErrosService>(ErrosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
