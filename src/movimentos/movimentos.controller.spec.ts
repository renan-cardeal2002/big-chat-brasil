import { Test, TestingModule } from '@nestjs/testing';
import { MovimentosController } from './movimentos.controller';
import { MovimentosService } from './movimentos.service';

describe('MovimentosController', () => {
  let controller: MovimentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimentosController],
      providers: [MovimentosService],
    }).compile();

    controller = module.get<MovimentosController>(MovimentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
