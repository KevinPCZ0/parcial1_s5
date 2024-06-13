import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Injectable()
export class EstadoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEstadoDto: CreateEstadoDto) {
    const nombre = createEstadoDto.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    const existingEstado = await this.prisma.estado.findFirst({
      where: {
        nombre: {
          equals: nombre,
          mode: 'insensitive'
        },
      },
    });

    if (existingEstado) {
      throw new Error('El estado ya existe');
    }

    return this.prisma.estado.create({
      data: {
        ...createEstadoDto,
        nombre,
      },
    });
  }

  findAll() {
    return this.prisma.estado.findMany();
  }

  findOne(id: number) {
    return this.prisma.estado.findUnique({ where: { id_estado: id } });
  }

  async update(id: number, updateEstadoDto: UpdateEstadoDto) {
    const nombre = updateEstadoDto.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const existingEstado = await this.prisma.estado.findFirst({
      where: {
        nombre: {
          equals: nombre,
          mode: 'insensitive'
        },
        NOT: { id_estado: id },
      },
    });

    if (existingEstado) {
      throw new Error('El estado ya existe');
    }

    return this.prisma.estado.update({
      where: { id_estado: id },
      data: {
        ...updateEstadoDto,
        nombre,
      },
    });
  }

  remove(id: number) {
    return this.prisma.estado.delete({ where: { id_estado: id } });
  }

  findMunicipios(estadoId: number) {
    return this.prisma.municipio.findMany({ where: { id_estado: estadoId } });
  }
}
