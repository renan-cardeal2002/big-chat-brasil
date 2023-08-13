import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('clientes_saldo')
export class Saldo {
  @OneToOne(() => Cliente, (cliente) => cliente.id_cliente)
  id_cliente: Cliente;

  @Column()
  saldo: number;
}
