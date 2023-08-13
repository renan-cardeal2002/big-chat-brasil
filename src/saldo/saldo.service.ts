import { Injectable } from '@nestjs/common';
import { CreateSaldoDto } from './dto/create-saldo.dto';
import { UpdateSaldoDto } from './dto/update-saldo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Saldo } from './entities/saldo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaldoService {
  constructor(
    @InjectRepository(Saldo)
    private saldoRepository: Repository<Saldo>,
  ) {}

  create(createSaldoDto: CreateSaldoDto) {
    return this.saldoRepository.save(createSaldoDto);
  }

  findAll() {
    return this.saldoRepository.find();
  }

  findOne(id: number) {
    return this.saldoRepository.findBy({ id_cliente: id });
  }

  update(id: number, updateSaldoDto: UpdateSaldoDto) {
    return this.saldoRepository.update({ id_cliente: id }, updateSaldoDto);
  }
}
