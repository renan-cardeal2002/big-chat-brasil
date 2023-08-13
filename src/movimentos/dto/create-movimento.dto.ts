export class CreateMovimentoDto {
  id_cliente: number;
  descricao: string;
  tipo_mvto: string;
  valor: number;
  data_mvto: Date;
}
