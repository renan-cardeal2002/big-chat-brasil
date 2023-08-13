import { Module } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { SaldoController } from './saldo.controller';

@Module({
  controllers: [SaldoController],
  providers: [SaldoService]
})
export class SaldoModule {}
