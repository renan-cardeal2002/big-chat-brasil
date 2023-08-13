import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { CreateMensagemDto } from './dto/create-mensagem.dto';

@Controller('mensagem')
export class MensagemController {
  constructor(private readonly mensagemService: MensagemService) {}

  @Post()
  create(@Body() createMensagemDto: CreateMensagemDto) {
    return this.mensagemService.create(createMensagemDto);
  }

  @Get()
  findAll() {
    return this.mensagemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mensagemService.findOne(+id);
  }
}
