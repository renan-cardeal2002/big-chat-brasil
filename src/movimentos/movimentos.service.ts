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
    try {
      var queryRunner = await this.conexao.getConexao();
    } catch (error) {
      console.log('Erro ao pegar a conexao');
    }

    const { id_cliente, valor, tipo_mvto } = createMovimentoDto;

    try {
      await queryRunner.startTransaction();

      const usaLim = await this.usaLimite(id_cliente);
      const getSaldo = await this.saldoService.findOne(id_cliente);
      const saldoAtual = getSaldo[0].saldo;

      const validaLimite = await this.validaLimite(id_cliente, valor);
      const validaSaldo = await this.validaTemSaldo(
        valor,
        tipo_mvto,
        saldoAtual,
      );

      if (usaLim && !validaLimite) {
        await queryRunner.rollbackTransaction();
        await this.conexao.closeConexao(queryRunner);
        return { message: 'Limite de saldo excedido.' };
      } else if (!usaLim && !validaSaldo) {
        await queryRunner.rollbackTransaction();
        await this.conexao.closeConexao(queryRunner);
        return { message: 'Valor informado é maior que o saldo disponível.' };
      }

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
      await queryRunner.rollbackTransaction();
      await this.conexao.closeConexao(queryRunner);
      this.erros.retornaErro(error);
    }
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

    console.log(cliente);

    if (cliente[0].limite < valor) {
      return false;
    } else {
      return true;
    }
  }

  async validaTemSaldo(valor: number, tipo_mvto: string, saldo: number) {
    if (tipo_mvto == 'D') {
      if (saldo < valor) {
        return false;
      } else {
        return true;
      }
    } else if (tipo_mvto == 'C') {
      return true;
    }

    return true;
  }

  async calculaNovoSaldo(
    saldo: any,
    valor_mvto: number,
    tipo_mvto: string,
  ): Promise<number> {
    let valor: any = 0;

    if (tipo_mvto == 'D') {
      valor = parseInt(saldo) - valor_mvto;
    } else {
      valor = parseInt(saldo) + valor_mvto;
    }

    return valor;
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
