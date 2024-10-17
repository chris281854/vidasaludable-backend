import { IsString } from "class-validator";

export class CreateMedicoDto {



    @IsString()
    nombre: string;

    
    @IsString()
    apellido: string;

    
    @IsString()
    especialidad: string;

    @IsString()
    userName: string;
   

   
 

}
