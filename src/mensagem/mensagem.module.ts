import { Module } from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { MensagemController } from './mensagem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { MovimentosModule } from 'src/movimentos/movimentos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mensagem]), MovimentosModule],
  controllers: [MensagemController],
  providers: [MensagemService],
})
export class MensagemModule {}
