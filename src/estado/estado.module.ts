import { Module } from '@nestjs/common';
import { EstadoController } from './estado.controller';
import { EstadoService } from './estado.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EstadoController],
  providers: [EstadoService]
})
export class EstadoModule {}
