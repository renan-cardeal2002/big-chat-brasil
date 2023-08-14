export class CreateMensagemDto {
  id_sms: number;
  id_cliente: number;
  envia_whatsapp: string;
  tel_destinatario: string;
  texto: string;
}
