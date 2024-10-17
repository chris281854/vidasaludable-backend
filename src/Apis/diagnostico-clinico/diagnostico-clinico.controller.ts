import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosticoClinicoService } from './diagnostico-clinico.service';
import { CreateDiagnosticoClinicoDto } from './dto/create-diagnostico-clinico.dto';
import { UpdateDiagnosticoClinicoDto } from './dto/update-diagnostico-clinico.dto';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiAcceptedResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorators';
import { Role } from '../../common/enums/rol.enums';
import { ActiveUser } from '../../common/decorators/active-user.decorators';
import { ActiveUserInterface } from '../../common/interfaces/user-active.interface';

@ApiTags("diagnostico-clinico")
@ApiBearerAuth()
@Controller('diagnostico-clinico')
export class DiagnosticoClinicoController {
  constructor(private readonly diagnosticoClinicoService: DiagnosticoClinicoService) {}

  @Auth(Role.USER)
  @Post()
  @ApiCreatedResponse({ description: 'El diagnostico clinico fue creado satisfactoriamente.'})
  @ApiForbiddenResponse({ description: 'No se encuenta el recurso.'})
  create(@Body() createDiagnosticoClinicoDto: CreateDiagnosticoClinicoDto,
  user: ActiveUserInterface,) {
    return this.diagnosticoClinicoService.create(createDiagnosticoClinicoDto,user);
  }


  @Auth(Role.USER)
  @Get()
  @ApiNotFoundResponse()
  @ApiAcceptedResponse()
  @ApiOkResponse()
  findAll(@ActiveUser()
    user: ActiveUserInterface,) {
   {
      return this.diagnosticoClinicoService.findAll(user);
    }
  }



@Auth(Role.USER)
  @Get(':id')
  @ApiUnauthorizedResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  findOne( @Param('id') id: number,
  @ActiveUser()
  user: ActiveUserInterface,) {
    return this.diagnosticoClinicoService.findOne(id,user);
  }



  @Auth(Role.USER)
  @Get(':id')
  @ApiUnauthorizedResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  findDate(
    @Param('id') id: number,
    @ActiveUser()
    user: ActiveUserInterface,) {
    return this.diagnosticoClinicoService.findOne(id,user);
  }


  @Auth(Role.USER)
  @Patch(':id')
  @ApiCreatedResponse({ description: 'El diagnostico clinico fue actualizado satisfactoriamente.'})
  @ApiForbiddenResponse({ description: 'No se encuenta el recurso.'})
  @ApiBadRequestResponse()
  async update(
    @Param('id') id: number, 
    @Body() updatediagnosticoclinicoDto: UpdateDiagnosticoClinicoDto,
    @ActiveUser() user: ActiveUserInterface
  ) {
    // Llamada al servicio para actualizar el paciente
    const result = await this.diagnosticoClinicoService.update(id, updatediagnosticoclinicoDto, user);
    
    return result;
  }
  
  @Auth(Role.ADMIN)
  @Delete(':id')
  @ApiCreatedResponse({ description: 'El diagnostico clinico fue elimininado satisfactoriamente.'})
  @ApiForbiddenResponse({ description: 'No se encuenta el recurso.'})
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  remove( @Param('id') id: number,
  @ActiveUser()
  user: ActiveUserInterface,) {
    return this.diagnosticoClinicoService.remove(id,user);
  }
}
