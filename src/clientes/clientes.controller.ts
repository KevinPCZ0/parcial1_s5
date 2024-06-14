import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    try {
      const cliente = await this.clientesService.createCliente(createClienteDto);
      return cliente;
    } catch (error) {
      if (error.response?.statusCode === 409) {
        throw new HttpException({ message: 'El RFC o el email ya están registrados.' }, HttpStatus.CONFLICT);
      }
      throw new HttpException({ message: 'Error al crear el cliente.' }, HttpStatus.INTERNAL_SERVER_ERROR);
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
  async update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    if (!updateClienteDto.Direcciones || !Array.isArray(updateClienteDto.Direcciones)) {
      throw new HttpException('Direcciones debe ser un arreglo válido.', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.clientesService.update(+id, updateClienteDto);
    } catch (error) {
      throw new HttpException('Error al actualizar el cliente.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedCliente = await this.clientesService.remove(+id);
      return deletedCliente;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error; // Propaga la excepción para manejarla en un nivel superior
      }
      throw new InternalServerErrorException('Error al eliminar el cliente.'); // Lanza un error genérico para otros casos
    }
  }
}
