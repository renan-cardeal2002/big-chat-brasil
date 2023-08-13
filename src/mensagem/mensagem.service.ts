import { Injectable } from '@nestjs/common';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { Repository } from 'typeorm';
import { SaldoService } from 'src/saldo/saldo.service';
import { MovimentosService } from 'src/movimentos/movimentos.service';

@Injectable()
export class MensagemService {
  constructor(
    @InjectRepository(Mensagem)
    private mensagemRepository: Repository<Mensagem>,
    private movimentoService: MovimentosService,
  ) {}

  async create(createMensagemDto: CreateMensagemDto) {
    let valorMvto = -0.25;
    let { id_cliente } = createMensagemDto;

    let mensagem = this.mensagemRepository.save(createMensagemDto);
    let movimento = this.movimentoService.create({
      id_cliente,
      descricao: 'ENVIO DE SMS',
      tipo_mvto: 'D',
      valor: valorMvto,
      data_mvto: new Date(),
    });

    return { mensagem, movimento };
  }

  findAll() {
    return this.mensagemRepository.find();
  }

  findOne(id: number) {
    return this.mensagemRepository.findBy({ id_sms: id });
  }
}
