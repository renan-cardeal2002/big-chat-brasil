import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('enviosms')
export class Mensagem {
  @PrimaryGeneratedColumn()
  id_sms: number;

  @Column({ nullable: false })
  id_cliente: number;

  @Column({ nullable: false })
  envia_whatsapp: string;

  @Column({ nullable: false })
  tel_destinatario: string;

  @Column({ nullable: false })
  texto: string;

  @Column({ nullable: false })
  data_envio: Date;
}
