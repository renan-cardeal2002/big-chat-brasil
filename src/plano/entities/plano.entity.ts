import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cadplano')
export class Plano {
  @PrimaryGeneratedColumn()
  id_plano: number;

  @Column()
  descricao: string;

  @Column()
  flag_usa_limite: string;
}
