import { Module } from '@nestjs/common';
import { MovimentosService } from './movimentos.service';
import { MovimentosController } from './movimentos.controller';

@Module({
  controllers: [MovimentosController],
  providers: [MovimentosService]
})
export class MovimentosModule {}
