import { Injectable } from '@nestjs/common';
import { CreateLocalidadeDto } from './dto/create-localidade.dto';
import { UpdateLocalidadeDto } from './dto/update-localidade.dto';
import { PrismaService } from 'prisma.service';


@Injectable()
export class LocalidadesService {
  constructor(private prisma: PrismaService) {}


  async create(data: CreateLocalidadeDto) {
    const normalizedNombre = (data.nombre);
    return this.prisma.localidad.create({
      data: {
        nombre: normalizedNombre,
        cp: data.cp,
        id_municipio: data.id_municipio,
      },
    });
  }

  async findAll() {
    return this.prisma.localidad.findMany();
  }

  async findOne(id: number) {
    return this.prisma.localidad.findUnique({
      where: { id_localidad: id },
    });
  }


  async update(id: number, data: UpdateLocalidadeDto) {
    const normalizedNombre = (data.nombre);
    return this.prisma.localidad.update({
      where: { id_localidad: id },
      data: {
        nombre: normalizedNombre,
        cp: data.cp,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.localidad.delete({
      where: { id_localidad: id },
    });
  }
}
