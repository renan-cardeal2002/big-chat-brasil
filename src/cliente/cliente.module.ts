import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Cliente } from './entities/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaldoModule } from 'src/saldo/saldo.module';
import { ConexaoService } from 'src/conexao/conexao.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente]), SaldoModule],
  controllers: [ClienteController],
  providers: [ClienteService, ConexaoService],
  exports: [ClienteService],
})
export class ClienteModule {}
