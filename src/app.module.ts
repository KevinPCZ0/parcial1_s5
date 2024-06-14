import { Module } from '@nestjs/common';
import { LocalidadesModule } from './localidades/localidades.module';
import { ClientesModule } from './clientes/clientes.module';
import { MunicipioModule } from './municipio/municipio.module';
import { PrismaService } from 'prisma.service';
import { EstadoModule } from './estado/estado.module';



@Module({
  imports: [LocalidadesModule, ClientesModule, MunicipioModule, EstadoModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
