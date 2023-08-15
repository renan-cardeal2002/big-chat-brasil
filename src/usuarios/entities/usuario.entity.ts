import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  senha: string;

  @Column({ nullable: false })
  id_cliente: number;
}
