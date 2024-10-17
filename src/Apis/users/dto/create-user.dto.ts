import { IsString } from "class-validator";

export class CreateUserDto {
 
   @IsString()
   name: string;

   email: string;

    
   password: string;
    
 
    
 
    

 
}
// function IsEmail(): (target: CreateUserDto, propertyKey: "email") => void {
//     throw new Error("Function not implemented.");
// }

