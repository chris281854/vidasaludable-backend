import { IsString } from "class-validator";

export class CreateDiagnosticoClinicoDto {


    @IsString()
    rup: string;

    @IsString()
    analiticas: string;

    @IsString()
    resultados: string;

    @IsString()
    conclusionMedica: string;

    @IsString()
    seguimiento: boolean;

    @IsString()
    proximaVisita: Date;

    @IsString()
    prioridad: string;

    @IsString()
    observacionesPriodidad: string;

    @IsString()
    idMedico: number;

    @IsString()
    especialidad: string;

    @IsString()
    fechaDiagnostico: Date;

 

    
    @IsString()
    userName: string;

}