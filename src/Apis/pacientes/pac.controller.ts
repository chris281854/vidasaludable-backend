import { Controller, Get,  Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacDto } from './dto/create-pac.dto';
import { UpdatePacDto } from './dto/update-pac.dto';
import { Auth } from '../../auth/decorators/auth.decorators';
import { Role } from '../../common/enums/rol.enums';
import { ActiveUser } from '../../common/decorators/active-user.decorators';
import { ActiveUserInterface } from '../../common/interfaces/user-active.interface';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags("Pacientes")
@ApiBearerAuth()
@Controller('vidasaludable')
export class PacController {
  constructor(private readonly PacienteService: PacienteService) {}

  @Auth(Role.USER)
  @Post()
  @ApiCreatedResponse({ description: 'El paciente fue creado satisfactoriamente.'})
  @ApiForbiddenResponse({ description: 'No se encuenta el recurso.'})
  create(@Body() createPacDto: CreatePacDto){

    return this.PacienteService.create(createPacDto);
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
    return this.PacienteService.findAll(user);
  }

  @Auth(Role.USER)
  @Get(':rup')
  @ApiUnauthorizedResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  findOne(
    @Param('rup') rup: string,
    @ActiveUser()
    user: ActiveUserInterface,) {
    return this.PacienteService.findOne(rup,user);
  }

  @Auth(Role.USER)
  @Get(':rup')
  @ApiUnauthorizedResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  findDate(
    @Param('rup') rup: string,
    @ActiveUser()
    user: ActiveUserInterface,) {
    return this.PacienteService.findOne(rup,user);
  }

  

  @Auth(Role.ADMIN)
  @Patch(':rup')
  @ApiCreatedResponse({ description: 'El paciente fue actualizado satisfactoriamente.'})
  @ApiForbiddenResponse({ description: 'No se encuenta el recurso.'})
  @ApiBadRequestResponse()
  async update(
    @Param('rup') rup: string, 
    @Body() updatePacDto: UpdatePacDto,
    @ActiveUser() user: ActiveUserInterface
  ) {
    // Llamada al servicio para actualizar el paciente
    const result = await this.PacienteService.update(rup, updatePacDto, user);
    
    return result;
  }
  

  @Auth(Role.ADMIN)
  @Delete(':id')
  @ApiCreatedResponse({ description: 'El registro fue eliminado satisfactoriamente.'})
  @ApiForbiddenResponse({ description: 'No se encuenta el recurso.'})
  @ApiBadRequestResponse()
  remove(
    @Param('rup') rup: string,
    @ActiveUser()
    user: ActiveUserInterface,){
    return this.PacienteService.remove(rup,user);
  }
}
