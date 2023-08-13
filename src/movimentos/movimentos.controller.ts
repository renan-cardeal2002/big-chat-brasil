import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimentosService } from './movimentos.service';
import { CreateMovimentoDto } from './dto/create-movimento.dto';
import { UpdateMovimentoDto } from './dto/update-movimento.dto';

@Controller('movimentos')
export class MovimentosController {
  constructor(private readonly movimentosService: MovimentosService) {}

  @Post()
  create(@Body() createMovimentoDto: CreateMovimentoDto) {
    return this.movimentosService.create(createMovimentoDto);
  }

  @Get()
  findAll() {
    return this.movimentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovimentoDto: UpdateMovimentoDto) {
    return this.movimentosService.update(+id, updateMovimentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimentosService.remove(+id);
  }
}
