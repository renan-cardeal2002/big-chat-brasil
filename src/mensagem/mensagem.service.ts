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
    try {
      var queryRunner = await this.conexao.getConexao();
    } catch (error) {
      console.log('Erro ao pegar a conexao');
    }

    let valorMvto = 0.25;
    let { id_cliente } = createMensagemDto;

    try {
      await queryRunner.startTransaction();

      let movimento = await this.movimentoService.create({
        id_cliente,
        descricao: 'ENVIO DE SMS',
        tipo_mvto: 'D',
        valor: valorMvto,
        data_mvto: new Date(),
      });

      if (movimento.message == 'ok') {
        var mensagem = await this.mensagemRepository.save({
          ...createMensagemDto,
          data_envio: new Date(),
        });
      } else {
        await queryRunner.rollbackTransaction();
        await this.conexao.closeConexao(queryRunner);
        return { message: movimento.message };
      }

      await queryRunner.commitTransaction();
      await this.conexao.closeConexao(queryRunner);
      return { mensagem, movimento };
    } catch (error) {
      await queryRunner.rollbackTransaction();
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
