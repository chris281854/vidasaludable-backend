import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicos } from './entities/medico.entity';
import { ActiveUserInterface } from '../../common/interfaces/user-active.interface';
import { Role } from '../../common/enums/rol.enums';

@Injectable()
export class MedicosService {

  constructor(
  @InjectRepository(Medicos)
  private readonly medicosteRepository: Repository<Medicos>,
  ){}



  async create(createMedicoDto: CreateMedicoDto, user: ActiveUserInterface) {
    const medico = await this.create(createMedicoDto, user);
    try{
    return await this.medicosteRepository.save({
      ...createMedicoDto,
     medico,
      userName: user.name,
    });
  }catch(error){
    console.log(error);
    throw new BadRequestException('No se pudo crear el medico');
  }
}
 
async findAll(user : ActiveUserInterface) {
  if (user.role === Role.ADMIN) {
    return await this.medicosteRepository.find();
  }
}

async findOne(id: number, user: ActiveUserInterface) {
    const medico = await this.medicosteRepository.findOneBy({ idMed: id });

  
  if (!medico) {
    throw new NotFoundException(`Medico con id ${id} no encontrado.`);
  } else if (medico.eliminado != null) {
    throw new NotFoundException(`El Medico con RUP ${id} ha sido eliminado en fecha ${medico.eliminado}.`);
  }
   // Validar la propiedad del paciente para usuarios no administradores
   this.validateOwnership(medico, user);
  
   return medico;
 }

 private validateOwnership(medico: Medicos, user: ActiveUserInterface) {
  if (user.role !== Role.ADMIN && medico.userName !== user.name) {
    // Validamos si el paciente tiene detalles con el nombre del usuario
    throw new UnauthorizedException();
   
  }

  // Mensaje de depuración si pasa la validación
  console.log(`Acceso permitido para el usuario ${user.name} al medico con id ${medico.idMed}`);
}




finddoctorByName(nombre: string) {
  return this.medicosteRepository.findOne({
    where: { nombre },
    select: ['idMed', 'nombre', 'apellido', 'especialidad'],
  });
}
  

async update(id: number, updateMedicoDto: UpdateMedicoDto, user: ActiveUserInterface) {
  await this.findOne(id, user );
  return await this.medicosteRepository.update(id, {
    ...updateMedicoDto,
      userName: user.name,
  })
}

  
async remove(id: number, user: ActiveUserInterface) {
  await this.findOne(id, user);
   return await this.medicosteRepository.softDelete( id );
  const result = await this.medicosteRepository.softDelete(id);
  if (result.affected === 0) {
    console.log(result);

      throw new BadRequestException(`No se pudo eliminar el paciente con id no.  ${id}`);
  }
}
}
