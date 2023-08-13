import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaldoService } from 'src/saldo/saldo.service';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    private saldoService: SaldoService,
  ) {}

  create(createClienteDto: CreateClienteDto) {
    let cliente = this.clienteRepository.create(createClienteDto);
    let saldo = this.saldoService.create({
      id_cliente: createClienteDto.id_cliente,
      saldo: 0,
    });

    return { cliente, saldo };
  }

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  findOne(id: number): Promise<Cliente[]> {
    return this.clienteRepository.findBy({ id_cliente: id });
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.clienteRepository.update({ id_cliente: id }, updateClienteDto);
  }

  remove(id: number) {
    return this.clienteRepository.delete({ id_cliente: id });
  }
}
