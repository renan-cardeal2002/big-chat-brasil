import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { CreateSaldoDto } from './dto/create-saldo.dto';
import { UpdateSaldoDto } from './dto/update-saldo.dto';

@Controller('saldo')
export class SaldoController {
  constructor(private readonly saldoService: SaldoService) {}

  @Get()
  findAll() {
    return this.saldoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saldoService.findOne(+id);
  }
}
