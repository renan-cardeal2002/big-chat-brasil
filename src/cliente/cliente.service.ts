import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaldoService } from 'src/saldo/saldo.service';
import { ConexaoService } from 'src/conexao/conexao.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    private saldoService: SaldoService,
    private usuarioService: UsuariosService,
    private conexao: ConexaoService,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    try {
      var queryRunner = await this.conexao.getConexao();
    } catch (error) {
      console.log('Erro ao pegar a conexao');
    }

    try {
      await queryRunner.startTransaction();
      const { id_cliente, senha, nome } = createClienteDto;

      const cliente = await this.clienteRepository.save(createClienteDto);
      const saldo = await this.saldoService.create({ id_cliente, saldo: 0 });
      const usuario = await this.usuarioService.create({
        senha,
        nome,
        id_cliente,
      });

      await queryRunner.commitTransaction();
      await this.conexao.closeConexao(queryRunner);
      return { cliente, saldo, usuario };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await this.conexao.closeConexao(queryRunner);
    }
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
