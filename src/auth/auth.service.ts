import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
  } from "@nestjs/common";
  import { RegisterDto } from "../auth/dto/register-dto";
  
  import { JwtService } from "@nestjs/jwt";
  import * as bcryptjs from "bcryptjs";
  import { UsersService } from "../Apis/users/users.service";
  import { LoginDto } from "../auth//dto/loging-dto";
@Injectable()
export class AuthService {
   
   constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
   ) {}

   async login({name,password}:LoginDto) {
    const user = await this.usersService.findOneBynameWithPassword(name);
    if (!user) {
         throw new UnauthorizedException('Usuario no encontrado');
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = {name: user.name, role: user.role};
    const token = await this.jwtService.signAsync(payload);
    
    return {
        token: token,
        name: user.name,
        role: user.role,
    };
       
   
}

     
    async register({name, email, password}: RegisterDto) {
         const user = await this.usersService.findOneByEmail(email);
         const nameDB = await this.usersService.findOneByName(name);

         if (user || nameDB) {
            throw new BadRequestException('El usuario ya existe');
          
     }
        await this.usersService.create({
            name, 
            email, 
            password: await bcryptjs.hash(password, 15)
        });

    
    return {    
        name,
        email,
    };
}
    async dashboard({name}: {name: string; role: string}) {
//      if(role !== 'admin') {
//             throw new UnauthorizedException('No tienes permiso para acceder a este recurso');
//         }
    return await this.usersService.findOneByName(name);

    }
}