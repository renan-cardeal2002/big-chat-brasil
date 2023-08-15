import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes_saldo')
export class Saldo {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  saldo: number;
}
