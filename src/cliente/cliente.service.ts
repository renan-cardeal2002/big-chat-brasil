import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saldo } from 'src/saldo/entities/saldo.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Saldo)
    private saldoRepository: Repository<Saldo>,
  ) {}

  create(createClienteDto: CreateClienteDto) {
    let cliente = this.clienteRepository.create(createClienteDto);
    let saldo = this.saldoRepository.create({
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
    return this.clienteRepository.update(id, updateClienteDto);
  }

  remove(id: number) {
    return this.clienteRepository.delete(id);
  }
}
