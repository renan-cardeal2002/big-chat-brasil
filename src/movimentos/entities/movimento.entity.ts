import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes_mvto')
export class Movimentos {
  @PrimaryGeneratedColumn()
  id_mvto: number;

  @Column({ nullable: false })
  id_cliente: number;

  @Column({ nullable: false })
  descricao: string;

  @Column({ nullable: false })
  tipo_mvto: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valor: number;

  @Column({ nullable: false })
  data_mvto: Date;
}
