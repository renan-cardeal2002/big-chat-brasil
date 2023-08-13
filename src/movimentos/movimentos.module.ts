import { Module } from '@nestjs/common';
import { MovimentosService } from './movimentos.service';
import { MovimentosController } from './movimentos.controller';
import { Movimentos } from './entities/movimento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaldoModule } from 'src/saldo/saldo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movimentos]), SaldoModule],
  controllers: [MovimentosController],
  providers: [MovimentosService],
})
export class MovimentosModule {}
