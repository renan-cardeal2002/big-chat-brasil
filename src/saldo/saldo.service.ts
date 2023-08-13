import { Injectable } from '@nestjs/common';
import { CreateSaldoDto } from './dto/create-saldo.dto';
import { UpdateSaldoDto } from './dto/update-saldo.dto';

@Injectable()
export class SaldoService {
  create(createSaldoDto: CreateSaldoDto) {
    return 'This action adds a new saldo';
  }

  findAll() {
    return `This action returns all saldo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saldo`;
  }

  update(id: number, updateSaldoDto: UpdateSaldoDto) {
    return `This action updates a #${id} saldo`;
  }

  remove(id: number) {
    return `This action removes a #${id} saldo`;
  }
}
