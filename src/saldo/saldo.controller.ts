import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { CreateSaldoDto } from './dto/create-saldo.dto';
import { UpdateSaldoDto } from './dto/update-saldo.dto';

@Controller('saldo')
export class SaldoController {
  constructor(private readonly saldoService: SaldoService) {}

  @Post()
  create(@Body() createSaldoDto: CreateSaldoDto) {
    return this.saldoService.create(createSaldoDto);
  }

  @Get()
  findAll() {
    return this.saldoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saldoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaldoDto: UpdateSaldoDto) {
    return this.saldoService.update(+id, updateSaldoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saldoService.remove(+id);
  }
}
