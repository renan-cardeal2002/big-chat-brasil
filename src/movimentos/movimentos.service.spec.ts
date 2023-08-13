import { Test, TestingModule } from '@nestjs/testing';
import { MovimentosService } from './movimentos.service';

describe('MovimentosService', () => {
  let service: MovimentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovimentosService],
    }).compile();

    service = module.get<MovimentosService>(MovimentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
