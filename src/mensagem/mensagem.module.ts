import { Module } from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { MensagemController } from './mensagem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensagem } from './entities/mensagem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mensagem])],
  controllers: [MensagemController],
  providers: [MensagemService],
})
export class MensagemModule {}
