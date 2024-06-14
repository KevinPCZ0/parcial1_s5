import { Module } from '@nestjs/common';
import { LocalidadesModule } from './localidades/localidades.module';
import { ClientesModule } from './clientes/clientes.module';
import { MunicipioModule } from './municipio/municipio.module';
import { PrismaService } from 'prisma.service';



@Module({
  imports: [LocalidadesModule, ClientesModule, MunicipioModule,ClientesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
