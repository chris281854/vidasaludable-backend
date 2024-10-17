import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallepacientesService } from './detallepacientes.service';
import { CreateDetallepacienteDto } from './dto/create-detallepaciente.dto';
import { UpdateDetallepacienteDto } from './dto/update-detallepaciente.dto';
import { Role } from '../../common/enums/rol.enums';
import { Auth } from '../../auth/decorators/auth.decorators';
import { ActiveUser } from '../../common/decorators/active-user.decorators';
import { ActiveUserInterface } from '../../common/interfaces/user-active.interface';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';


@ApiTags("Detalle Pacientes")
@ApiBearerAuth()
@Controller('detallepacientes')
export class DetallepacientesController {
  constructor(private readonly detallepacientesService: DetallepacientesService) {}

  @Auth(Role.USER)
  @Post()
  @ApiCreatedResponse({ description: 'El paciente fue creado satisfactoriamente.'})
  @ApiForbiddenResponse({ description: 'No se encuenta el recurso.'})
  create(@Body() createDetallepacienteDto: CreateDetallepacienteDto,
  @ActiveUser()
  user: ActiveUserInterface,
    ) {
    try {
      return this.detallepacientesService.create(createDetallepacienteDto, user);
    } catch (error) {
      console.log(error);
      
    }  
  }

  @Auth(Role.USER)
  @Get()
  @ApiNotFoundResponse()
  @ApiAcceptedResponse()
  @ApiOkResponse()
  findAll(
    @ActiveUser()
    user: ActiveUserInterface,
  ) {
    return this.detallepacientesService.findAll(user);
  }

  @Auth(Role.USER)
  @Get(':idPaciente')
  @ApiUnauthorizedResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  findOne(@Param('idPaciente') idPaciente: string,
  @ActiveUser()
  user: ActiveUserInterface,
   ) {
    return this.detallepacientesService.findOne(idPaciente,user);
  }

  @Auth(Role.USER)
  @Patch(':idPaciente')
  @ApiCreatedResponse({ description: 'El paciente fue actualizado satisfactoriamente.'})
  @ApiForbiddenResponse({ description: 'No se encuenta el recurso.'})
  @ApiBadRequestResponse()
  update(@Param('idPaciente') idPaciente: string, 
  @Body() updateDetallepacienteDto: UpdateDetallepacienteDto,)
  {
    return this.detallepacientesService.update(idPaciente, updateDetallepacienteDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':idPaciente')
  @ApiCreatedResponse({ description: 'El paciente fue actualizado satisfactoriamente.'})
  @ApiForbiddenResponse({ description: 'No se encuenta el recurso.'})
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  remove(@Param('idPaciente') idPaciente: string,
  @ActiveUser()
  user: ActiveUserInterface,) {
    return this.detallepacientesService.remove(idPaciente,user);
  }
}
