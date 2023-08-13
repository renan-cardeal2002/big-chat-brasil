import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @Column()
  nome: string;

  @Column()
  tel: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  cnpj: string;

  @Column()
  nome_empresa: string;

  @Column()
  id_plano: number;

  @Column()
  limite: number;
}
