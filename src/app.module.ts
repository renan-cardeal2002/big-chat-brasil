import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './cliente/cliente.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { MensagemModule } from './mensagem/mensagem.module';
import { MovimentosModule } from './movimentos/movimentos.module';
import { SaldoModule } from './saldo/saldo.module';
import { PlanoModule } from './plano/plano.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { Mensagem } from './mensagem/entities/mensagem.entity';
import { Movimentos } from './movimentos/entities/movimento.entity';
import { Plano } from './plano/entities/plano.entity';
import { Saldo } from './saldo/entities/saldo.entity';
import { Usuario } from './usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bcb',
      entities: [Cliente, Mensagem, Movimentos, Plano, Saldo, Usuario],
      synchronize: true,
    }),
    ClienteModule,
    MensagemModule,
    MovimentosModule,
    SaldoModule,
    PlanoModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
