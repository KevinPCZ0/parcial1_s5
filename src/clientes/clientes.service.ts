import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; 
import { Prisma, Cliente } from '@prisma/client';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async createCliente(createClienteDto: CreateClienteDto) {
    try {
      const cliente = await this.prisma.cliente.create({
        data: {
          nombre: createClienteDto.nombre,
          apellidos: createClienteDto.apellidos,
          rfc: createClienteDto.rfc,
          email: createClienteDto.email,
          telefono: createClienteDto.telefono,
          Direcciones: {
            createMany: {
              data: createClienteDto.Direcciones,
            },
          },
        },
        include: {
          Direcciones: true, // Incluir direcciones en la respuesta
        },
      });

      return cliente;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('El RFC o el email ya están registrados.'); // Ejemplo de manejo de error específico
      }
      throw error; // Propaga cualquier otro error
    }
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
    try {
      // Verifica si el cliente existe
      const clienteExistente = await this.prisma.cliente.findUnique({
        where: { id_cliente: id },
        include: { Direcciones: true }, // Incluir relaciones para verificar dependencias
      });

      // Si el cliente no existe, lanza NotFoundException
      if (!clienteExistente) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
      }

      // Verifica si hay dependencias que deben eliminarse manualmente
      if (clienteExistente.Direcciones.length > 0) {
        throw new ConflictException('No se puede eliminar el cliente porque tiene direcciones asociadas.');
      }

      // Elimina el cliente si no hay dependencias
      const clienteEliminado = await this.prisma.cliente.delete({
        where: { id_cliente: id },
      });

      return clienteEliminado;
    } catch (error) {
      // Captura y maneja las excepciones específicas
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error; // Lanza la excepción específica directamente
      }
      throw new Error('Error al eliminar el cliente.'); // Lanza un error genérico para otros casos
    }
  }
}
