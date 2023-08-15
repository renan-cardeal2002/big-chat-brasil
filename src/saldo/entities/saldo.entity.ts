import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes_saldo')
export class Saldo {
  @PrimaryGeneratedColumn()
  @OneToOne(() => Cliente, (cliente) => cliente.id_cliente)
  id_cliente: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  saldo: number;
}
