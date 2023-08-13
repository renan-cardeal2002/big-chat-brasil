import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nome: string;

  @Column()
  senha: string;

  @OneToOne(() => Cliente, (cliente) => cliente.id_cliente)
  id_cliente: number;
}
