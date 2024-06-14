import { IsString, IsNotEmpty, IsEmail, IsOptional, ValidateNested, IsEnum, IsArray, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateDireccionDto {
  @IsOptional()
  @IsInt()
  id_direccion?: number;

  @IsOptional()
  @IsString()
  calle?: string;

  @IsOptional()
  @IsString()
  numero_exterior?: string;

  @IsOptional()
  @IsString()
  numero_interior?: string;

  @IsOptional()
  id_localidad?: number;
}

enum Estatus {
  activo = 'activo',
  inactivo = 'inactivo',
}

export class UpdateClienteDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  apellidos?: string;

  @IsOptional()
  @IsString()
  rfc?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEnum(Estatus)
  estatus?: Estatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateDireccionDto)
  Direcciones?: UpdateDireccionDto[];
}
