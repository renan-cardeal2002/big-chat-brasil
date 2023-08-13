import { Module } from '@nestjs/common';
import { MovimentosService } from './movimentos.service';
import { MovimentosController } from './movimentos.controller';
import { Movimentos } from './entities/movimento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaldoModule } from 'src/saldo/saldo.module';
import { PlanoModule } from 'src/plano/plano.module';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movimentos]),
    SaldoModule,
    PlanoModule,
    ClienteModule,
  ],
  controllers: [MovimentosController],
  providers: [MovimentosService],
  exports: [MovimentosService],
})
export class MovimentosModule {}
