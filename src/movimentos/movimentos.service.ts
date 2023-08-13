import { Injectable } from '@nestjs/common';
import { CreateMovimentoDto } from './dto/create-movimento.dto';
import { UpdateMovimentoDto } from './dto/update-movimento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimentos } from './entities/movimento.entity';
import { Repository } from 'typeorm';
import { SaldoService } from 'src/saldo/saldo.service';

@Injectable()
export class MovimentosService {
  constructor(
    @InjectRepository(Movimentos)
    private movimentoRepository: Repository<Movimentos>,
    private saldoService: SaldoService,
  ) {}

  async create(createMovimentoDto: CreateMovimentoDto) {
    let { id_cliente } = createMovimentoDto;
    let valorMvto = 0.25;

    let saldoAtual = await this.saldoService.findOne(id_cliente);
    await this.saldoService.update(id_cliente, {
      saldo: saldoAtual[0].saldo - valorMvto,
    });

    return this.movimentoRepository.create(createMovimentoDto);
  }

  findAll() {
    return this.movimentoRepository.find();
  }

  findOne(id: number) {
    return this.movimentoRepository.findBy({ id_mvto: id });
  }

  update(id: number, updateMovimentoDto: UpdateMovimentoDto) {
    return this.movimentoRepository.update({ id_mvto: id }, updateMovimentoDto);
  }

  remove(id: number) {
    return this.movimentoRepository.delete({ id_mvto: id });
  }
}
