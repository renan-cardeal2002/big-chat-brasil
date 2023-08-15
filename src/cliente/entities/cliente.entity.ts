import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  tel: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  cpf: string;

  @Column()
  cnpj: string;

  @Column()
  nome_empresa: string;

  @Column({ nullable: false })
  id_plano: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  limite: number;
}
