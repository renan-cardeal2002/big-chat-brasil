import { Injectable } from '@nestjs/common';
import { CreateMovimentoDto } from './dto/create-movimento.dto';
import { UpdateMovimentoDto } from './dto/update-movimento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimentos } from './entities/movimento.entity';
import { QueryRunner, Repository } from 'typeorm';
import { SaldoService } from 'src/saldo/saldo.service';
import { PlanoService } from 'src/plano/plano.service';
import { ClienteService } from 'src/cliente/cliente.service';

@Injectable()
export class MovimentosService {
  constructor(
    @InjectRepository(Movimentos)
    private movimentoRepository: Repository<Movimentos>,
    private saldoService: SaldoService,
    private planoService: PlanoService,
    private clienteService: ClienteService,
  ) {}

  async create(createMovimentoDto: CreateMovimentoDto) {
    const { id_cliente, valor } = createMovimentoDto;
    const usaLim = await this.usaLimite(id_cliente);

    if (usaLim && !(await this.validaLimite(id_cliente, valor))) {
      throw new Error('Limite de saldo excedido.');
    }

    const saldoAtual = await this.saldoService.findOne(id_cliente);
    const novoSaldo = saldoAtual[0].saldo + valor;

    await this.saldoService.update(id_cliente, { saldo: novoSaldo });
    return this.movimentoRepository.save(createMovimentoDto);
  }

  async usaLimite(id_cliente: number) {
    let cliente = await this.clienteService.findOne(id_cliente);
    let plano = await this.planoService.findOne(cliente[0].id_plano);

    if (plano[0].flag_usa_limite == 'S') {
      return true;
    } else {
      return false;
    }
  }

  async validaLimite(id_cliente: number, valor: number) {
    let cliente = await this.clienteService.findOne(id_cliente);

    if (cliente[0].limite < valor) {
      return false;
    } else {
      return true;
    }
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
