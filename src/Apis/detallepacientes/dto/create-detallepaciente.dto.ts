import { IsDateString, IsString, MaxLength } from "class-validator";

export class CreateDetallepacienteDto {

    @IsString()
    idPaciente: string;


    @MaxLength(500)
    @IsString()
    objetivo: string;

    
    @MaxLength(500)
    @IsString()
    motivo: string;
 
    @IsDateString()
    fechaRegistro: Date;

    @IsDateString()
    fechaModificacion: Date;

  
    @IsString()
    estado: string;

    @IsString()
    userName: string;
 

}
