import { Injectable } from '@nestjs/common';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { Repository } from 'typeorm';
import { MovimentosService } from 'src/movimentos/movimentos.service';
import { ConexaoService } from 'src/conexao/conexao.service';
import { ErrosService } from 'src/erros/erros.service';

@Injectable()
export class MensagemService {
  constructor(
    @InjectRepository(Mensagem)
    private mensagemRepository: Repository<Mensagem>,
    private movimentoService: MovimentosService,
    private conexao: ConexaoService,
    private erros: ErrosService,
  ) {}

  async create(createMensagemDto: CreateMensagemDto) {
    const valorMvto = 0.25;
    const { id_cliente } = createMensagemDto;
    let mensagem;
    let movimento;

    try {
      var queryRunner = await this.conexao.getConexao();
    } catch (error) {
      console.log('Erro ao pegar a conexao');
    }

    try {
      await queryRunner.startTransaction();

      movimento = await this.movimentoService.create({
        id_cliente,
        descricao: 'ENVIO DE SMS',
        tipo_mvto: 'D',
        valor: valorMvto,
        data_mvto: new Date(),
      });

      if (movimento.message !== 'ok') {
        await queryRunner.rollbackTransaction();
        await this.conexao.closeConexao(queryRunner);
        return { message: movimento.message };
      }

      mensagem = await this.mensagemRepository.save({
        ...createMensagemDto,
        data_envio: new Date(),
      });

      await queryRunner.commitTransaction();
      await this.conexao.closeConexao(queryRunner);

      return { mensagem, movimento };
    } catch (error) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      await this.conexao.closeConexao(queryRunner);
      this.erros.retornaErro(error);
    }
  }

  findAll() {
    return this.mensagemRepository.find();
  }

  findOne(id: number) {
    return this.mensagemRepository.findBy({ id_sms: id });
  }
}
