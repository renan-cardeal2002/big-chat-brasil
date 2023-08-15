import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cadplano')
export class Plano {
  @PrimaryGeneratedColumn()
  id_plano: number;

  @Column({ nullable: false })
  descricao: string;

  @Column({ nullable: false })
  flag_usa_limite: string;
}
