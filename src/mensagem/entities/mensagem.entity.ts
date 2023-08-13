import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('enviosms')
export class Mensagem {
  @PrimaryGeneratedColumn()
  id_sms: number;

  @Column()
  id_cliente: number;

  @Column()
  envia_whatsapp: string;

  @Column()
  tel_destinatario: string;

  @Column()
  texto: string;

  @Column()
  data_envio: Date;
}
