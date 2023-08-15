import { Injectable } from '@nestjs/common';
import { CreateMovimentoDto } from './dto/create-movimento.dto';
import { UpdateMovimentoDto } from './dto/update-movimento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimentos } from './entities/movimento.entity';
import { Repository } from 'typeorm';
import { SaldoService } from 'src/saldo/saldo.service';
import { PlanoService } from 'src/plano/plano.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { ConexaoService } from 'src/conexao/conexao.service';
import { ErrosService } from 'src/erros/erros.service';

@Injectable()
export class MovimentosService {
  constructor(
    @InjectRepository(Movimentos)
    private movimentoRepository: Repository<Movimentos>,
    private saldoService: SaldoService,
    private planoService: PlanoService,
    private clienteService: ClienteService,
    private conexao: ConexaoService,
    private erros: ErrosService,
  ) {}

  async create(createMovimentoDto: CreateMovimentoDto) {
    const { id_cliente, valor, tipo_mvto } = createMovimentoDto;

    try {
      var queryRunner = await this.conexao.getConexao();
    } catch (error) {
      console.log('Erro ao pegar a conexao');
    }

    try {
      const usaLim = await this.usaLimite(id_cliente);
      const getSaldo = await this.saldoService.findOne(id_cliente);
      const saldoAtual = getSaldo[0].saldo;

      const validaLimite = await this.validaLimite(id_cliente, valor);
      const validaSaldo = await this.validaTemSaldo(
        valor,
        tipo_mvto,
        saldoAtual,
      );

      if ((usaLim && !validaLimite) || (!usaLim && !validaSaldo)) {
        return {
          message: usaLim
            ? 'Limite de saldo excedido.'
            : 'Valor informado é maior que o saldo disponível.',
        };
      }

      await queryRunner.startTransaction();

      const novoSaldo = await this.calculaNovoSaldo(
        saldoAtual,
        valor,
        tipo_mvto,
      );

      if (!usaLim) {
        await this.saldoService.update(id_cliente, {
          id_cliente,
          saldo: novoSaldo,
        });
      }

      const movimentoSave = await this.movimentoRepository.save(
        createMovimentoDto,
      );

      await queryRunner.commitTransaction();
      await this.conexao.closeConexao(queryRunner);

      return { message: 'ok', movimentoSave };
    } catch (error) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      await this.conexao.closeConexao(queryRunner);
      this.erros.retornaErro(error);
    }
  }

  async usaLimite(id_cliente: number): Promise<boolean> {
    const cliente = await this.clienteService.findOne(id_cliente);
    const plano = await this.planoService.findOne(cliente[0].id_plano);

    return plano[0].flag_usa_limite === 'S';
  }

  async validaLimite(id_cliente: number, valor: number): Promise<boolean> {
    const cliente = await this.clienteService.findOne(id_cliente);

    return cliente[0].limite >= valor;
  }

  async validaTemSaldo(
    valor: number,
    tipo_mvto: string,
    saldo: number,
  ): Promise<boolean> {
    if (tipo_mvto === 'D') {
      return saldo >= valor;
    } else if (tipo_mvto === 'C') {
      return true;
    }
  }

  async calculaNovoSaldo(
    saldo: any,
    valor_mvto: number,
    tipo_mvto: string,
  ): Promise<number> {
    if (tipo_mvto === 'D') {
      return parseInt(saldo) - valor_mvto;
    } else {
      return parseInt(saldo) + valor_mvto;
    }
  }

  findAll(): Promise<Movimentos[]> {
    return this.movimentoRepository.find();
  }

  findOne(id: number): Promise<Movimentos[]> {
    return this.movimentoRepository.findBy({ id_mvto: id });
  }

  update(id: number, updateMovimentoDto: UpdateMovimentoDto) {
    return this.movimentoRepository.update({ id_mvto: id }, updateMovimentoDto);
  }

  remove(id: number) {
    return this.movimentoRepository.delete({ id_mvto: id });
  }
}
