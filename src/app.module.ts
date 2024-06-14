import { Module } from '@nestjs/common';
import { LocalidadesModule } from './localidades/localidades.module';



@Module({
  imports: [LocalidadesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
