import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Cliente } from './entities/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saldo } from 'src/saldo/entities/saldo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Saldo])],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
