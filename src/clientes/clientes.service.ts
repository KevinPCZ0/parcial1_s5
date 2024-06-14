import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; 
import { Prisma, Cliente } from '@prisma/client';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClienteDto): Promise<Cliente> {
    const { Direcciones, ...rest } = data;

    return this.prisma.cliente.create({
      data: {
        ...rest,
        Direcciones: {
          create: Direcciones.map(direccion => ({
            calle: direccion.calle,
            numero_exterior: direccion.numero_exterior,
            numero_interior: direccion.numero_interior,
            id_localidad: direccion.id_localidad,
          })),
        },
      },
      include: {
        Direcciones: {
          include: {
            Localidad: {
              include: {
                Municipio: {
                  include: {
                    Estado: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findAll(): Promise<Cliente[]> {
    return this.prisma.cliente.findMany({
      include: {
        Direcciones: {
          include: {
            Localidad: {
              include: {
                Municipio: {
                  include: {
                    Estado: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Cliente | null> {
    return this.prisma.cliente.findUnique({
      where: { id_cliente: id },
      include: {
        Direcciones: {
          include: {
            Localidad: {
              include: {
                Municipio: {
                  include: {
                    Estado: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateClienteDto): Promise<Cliente> {
    const { Direcciones, ...rest } = data;

    const updateData: Prisma.ClienteUpdateInput = {
      ...rest,
      Direcciones: Direcciones ? {
        upsert: Direcciones.map(direccion => ({
          where: { id_direccion: direccion.id_direccion || 0 },
          update: {
            calle: direccion.calle,
            numero_exterior: direccion.numero_exterior,
            numero_interior: direccion.numero_interior,
            id_localidad: direccion.id_localidad,
          },
          create: {
            calle: direccion.calle,
            numero_exterior: direccion.numero_exterior,
            numero_interior: direccion.numero_interior,
            id_localidad: direccion.id_localidad,
          },
        })),
      } : undefined,
    };

    return this.prisma.cliente.update({
      where: { id_cliente: id },
      data: updateData,
      include: {
        Direcciones: {
          include: {
            Localidad: {
              include: {
                Municipio: {
                  include: {
                    Estado: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async remove(id: number): Promise<Cliente> {
    return this.prisma.cliente.delete({
      where: { id_cliente: id },
    });
  }
}
