import { Type } from "class-transformer";
import { IsDateString, IsString, ValidateNested } from "class-validator";
import { CreateDetallepacienteDto } from '../../detallepacientes/dto/create-detallepaciente.dto';

export class CreatePacDto {

     

    @IsString()
    rup: string;

    @IsString()
    nombre: string;

    @IsString()
    apellido: string;

    @IsString()
    sexo: string;

    @IsString()
    ciudad: string;

    @IsDateString()
    nacimiento: Date;

    @IsDateString()
    registro: Date;

    @IsString()
    estado: string;
   

   
  @ValidateNested({ each: true })
  @Type(() => CreateDetallepacienteDto)
  detallepaciente: CreateDetallepacienteDto[];


}

