import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiAcceptedResponse, ApiOkResponse, ApiUnauthorizedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Role } from 'src/common/enums/rol.enums';
import { ActiveUser } from 'src/common/decorators/active-user.decorators';
import { ActiveUserInterface } from 'src/common/interfaces/user-active.interface';

@ApiTags("Medicos")
@ApiBearerAuth()
@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Auth(Role.USER)
  @Post()
  @ApiCreatedResponse({ description: 'El registro fue creado satisfactoriamente.'})
  @ApiForbiddenResponse({ description: 'No se encuenta el recurso.'})
  @Post()
  
  create(@Body() createMedicoDto: CreateMedicoDto,
  @ActiveUser()
  user: ActiveUserInterface,) {
    return this.medicosService.create(createMedicoDto,user);
  }

  @Auth(Role.USER)
  @Get()
  @ApiNotFoundResponse()
  @ApiAcceptedResponse()
  @ApiOkResponse()
  @Get()
  findAll(
    @ActiveUser()
    user: ActiveUserInterface,
  ) {
    return this.medicosService.findAll(user);
  }

  @Auth(Role.USER)
  @Get(':id')
  @ApiUnauthorizedResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(
    @Param('id') id: number,
    @ActiveUser()
    user: ActiveUserInterface,) {
    return this.medicosService.findOne(id,user);
  }

  @Auth(Role.USER)
  @Get(':nombre')
  @ApiUnauthorizedResponse()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':nombre')
  finddoctorByName(@Param('') nombre: string) {
    return this.medicosService.finddoctorByName(nombre);
  }


  @Auth(Role.ADMIN)
  @Patch(':id')
  @ApiCreatedResponse({ description: 'El registro fue actualizado satisfactoriamente.'})
  @ApiForbiddenResponse({ description: 'No se encuenta el recurso.'})
  @ApiBadRequestResponse()
  @Patch(':id')
  update(@Param('id') id: number, 
  @Body() updateMedicoDto: UpdateMedicoDto,
  @ActiveUser()
  user: ActiveUserInterface,) {
    return this.medicosService.update(id, updateMedicoDto,user);
  }


  @Auth(Role.ADMIN)
  @Delete(':id')
  @ApiCreatedResponse({ description: 'El registro fue eliminado satisfactoriamente.'})
  @ApiForbiddenResponse({ description: 'No se encuenta el recurso.'})
  @ApiBadRequestResponse()
  @Delete(':id')
  remove(@Param('id') id: number,
  @ActiveUser()
  user: ActiveUserInterface,) {
    return this.medicosService.remove(id,user);
  }
}
