
export class CreateUserDto {
 
   name: string;

    email: string;

    
    password: string;
    
 
    
 
    

 
}
function IsEmail(): (target: CreateUserDto, propertyKey: "email") => void {
    throw new Error("Function not implemented.");
}

