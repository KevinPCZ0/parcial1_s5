import { IsString, IsNotEmpty, IsEmail, IsOptional, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

class CreateDireccionDto {
  @IsNotEmpty()
  @IsString()
  calle: string;

  @IsNotEmpty()
  @IsString()
  numero_exterior: string;

  @IsOptional()
  @IsString()
  numero_interior?: string;

  @IsNotEmpty()
  id_localidad: number;
}

enum Estatus {
  activo = 'activo',
  inactivo = 'inactivo',
}

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @IsNotEmpty()
  @IsString()
  rfc: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsOptional()
  @IsEnum(Estatus)
  estatus?: Estatus = Estatus.activo;

  @ValidateNested({ each: true })
  @Type(() => CreateDireccionDto)
  Direcciones?: CreateDireccionDto[];
}
