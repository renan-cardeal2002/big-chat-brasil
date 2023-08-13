import { Injectable } from '@nestjs/common';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { UpdateMensagemDto } from './dto/update-mensagem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MensagemService {
  constructor(
    @InjectRepository(Mensagem)
    private mensagemRepository: Repository<Mensagem>,
  ) {}

  create(createMensagemDto: CreateMensagemDto) {
    return this.mensagemRepository.create(createMensagemDto);
  }

  findAll() {
    return this.mensagemRepository.find();
  }

  findOne(id: number) {
    return this.mensagemRepository.findBy({ id_sms: id });
  }

  update(id: number, updateMensagemDto: UpdateMensagemDto) {
    return this.mensagemRepository.update(id, updateMensagemDto);
  }

  remove(id: number) {
    return this.mensagemRepository.delete(id);
  }
}
