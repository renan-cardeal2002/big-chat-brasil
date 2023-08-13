import { Injectable } from '@nestjs/common';
import { CreateMovimentoDto } from './dto/create-movimento.dto';
import { UpdateMovimentoDto } from './dto/update-movimento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimentos } from './entities/movimento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MovimentosService {
  constructor(
    @InjectRepository(Movimentos)
    private movimentoRepository: Repository<Movimentos>,
  ) {}

  create(createMovimentoDto: CreateMovimentoDto) {
    return this.movimentoRepository.create(createMovimentoDto);
  }

  findAll() {
    return this.movimentoRepository.find();
  }

  findOne(id: number) {
    return this.movimentoRepository.findBy({ id_mvto: id });
  }

  update(id: number, updateMovimentoDto: UpdateMovimentoDto) {
    return this.movimentoRepository.update(id, updateMovimentoDto);
  }

  remove(id: number) {
    return this.movimentoRepository.delete(id);
  }
}
