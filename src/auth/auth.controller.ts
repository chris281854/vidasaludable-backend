import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/loging-dto';
import { UsersService } from "../users/users.service";
import { Role } from '../common/enums/rol.enums';
import { Auth } from './decorators/auth.decorators';
import { ActiveUser } from '../common/decorators/active-user.decorators';
import { ActiveUserInterface } from '../common/interfaces/user-active.interface';
import { ApiTags } from '@nestjs/swagger';

// interface RequestWithUser extends Request {
//   user: { name: string; role: string };
// }
@ApiTags("Authentications")
@Controller('auth')
export class AuthController {

    constructor(
      private readonly authService: AuthService,
      private readonly userService: UsersService,

    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(
      @Body() 
      loginDto: LoginDto
    ) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(
        @Body() 
        registerDto: RegisterDto
    ) {
      return this.authService.register(registerDto); 
  
    }

    @Get('dashboard')
    @Auth(Role.USER)
    dashboard(@ActiveUser() user : ActiveUserInterface) {
      console.log(user);
      return this.authService.dashboard(user);  
        }
}