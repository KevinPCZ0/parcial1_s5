import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    // Verifica que Direcciones sea un arreglo antes de intentar hacer map
    if (createClienteDto.Direcciones && Array.isArray(createClienteDto.Direcciones)) {
      return this.clientesService.create(createClienteDto);
    } else {
      throw new Error('Direcciones debe ser un arreglo válido.');
    }
  }

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    // Verifica que Direcciones sea un arreglo antes de intentar hacer map
    if (updateClienteDto.Direcciones && Array.isArray(updateClienteDto.Direcciones)) {
      return this.clientesService.update(+id, updateClienteDto);
    } else {
      throw new Error('Direcciones debe ser un arreglo válido.');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(+id);
  }
}
