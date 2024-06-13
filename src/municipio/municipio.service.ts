import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';

@Injectable()
export class MunicipioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMunicipioDto: CreateMunicipioDto) {
    const nombre = createMunicipioDto.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const existingMunicipio = await this.prisma.municipio.findFirst({
      where: {
        nombre: {
          equals: nombre,
          mode: 'insensitive'
        },
        id_estado: createMunicipioDto.id_estado,
      },
    });

    if (existingMunicipio) {
      throw new Error('El municipio ya existe en este estado');
    }

    return this.prisma.municipio.create({
      data: {
        ...createMunicipioDto,
        nombre,
      },
    });
  }

  findAll() {
    return this.prisma.municipio.findMany();
  }

  findOne(id: number) {
    return this.prisma.municipio.findUnique({ where: { id_municipio: id } });
  }

  async update(id: number, updateMunicipioDto: UpdateMunicipioDto) {
    const nombre = updateMunicipioDto.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const existingMunicipio = await this.prisma.municipio.findFirst({
      where: {
        nombre: {
          equals: nombre,
          mode: 'insensitive'
        },
        id_estado: updateMunicipioDto.id_estado,
        NOT: { id_municipio: id },
      },
    });

    if (existingMunicipio) {
      throw new Error('El municipio ya existe en este estado');
    }

    return this.prisma.municipio.update({
      where: { id_municipio: id },
      data: {
        ...updateMunicipioDto,
        nombre,
      },
    });
  }

  remove(id: number) {
    return this.prisma.municipio.delete({ where: { id_municipio: id } });
  }

  findLocalidades(municipioId: number) {
    return this.prisma.localidad.findMany({ where: { id_municipio: municipioId } });
  }
  
  async getLocalidadesByMunicipio(id: number) {
    return this.prisma.localidad.findMany({
      where: {
        id_municipio: id,
      },
    });
  }
}
