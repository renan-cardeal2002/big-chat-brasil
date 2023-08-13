import { Module } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { SaldoController } from './saldo.controller';
import { Saldo } from './entities/saldo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Saldo])],
  controllers: [SaldoController],
  providers: [SaldoService],
})
export class SaldoModule {}
