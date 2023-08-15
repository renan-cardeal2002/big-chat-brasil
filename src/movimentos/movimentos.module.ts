import { Module } from '@nestjs/common';
import { MovimentosService } from './movimentos.service';
import { MovimentosController } from './movimentos.controller';
import { Movimentos } from './entities/movimento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaldoModule } from 'src/saldo/saldo.module';
import { PlanoModule } from 'src/plano/plano.module';
import { ClienteModule } from 'src/cliente/cliente.module';
import { ConexaoService } from 'src/conexao/conexao.service';
import { ErrosService } from 'src/erros/erros.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movimentos]),
    SaldoModule,
    PlanoModule,
    ClienteModule,
  ],
  controllers: [MovimentosController],
  providers: [MovimentosService, ConexaoService, ErrosService],
  exports: [MovimentosService],
})
export class MovimentosModule {}
