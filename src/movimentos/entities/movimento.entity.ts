import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes_mvto')
export class Movimentos {
  @PrimaryGeneratedColumn()
  id_mvto: number;

  @Column()
  id_cliente: number;

  @Column()
  descricao: string;

  @Column()
  tipo_mvto: string;

  @Column()
  valor: number;

  @Column()
  data_mvto: Date;
}
