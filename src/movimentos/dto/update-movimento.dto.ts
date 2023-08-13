import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimentoDto } from './create-movimento.dto';

export class UpdateMovimentoDto extends PartialType(CreateMovimentoDto) {}
