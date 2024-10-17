import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDiagnosticoClinicoDto } from './dto/create-diagnostico-clinico.dto';
import { UpdateDiagnosticoClinicoDto } from './dto/update-diagnostico-clinico.dto';
import { DiagnosticoClinico } from './entities/diagnostico-clinico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicos } from '../medicos/entities/medico.entity';
import { Repository } from 'typeorm';
import { Role } from '../../common/enums/rol.enums';
import { ActiveUserInterface } from '../../common/interfaces/user-active.interface';

@Injectable()
export class DiagnosticoClinicoService {


  constructor(
    
    @InjectRepository(DiagnosticoClinico)
    private readonly diagnosticoClinicoRepository: Repository<DiagnosticoClinico>,
    
    
    @InjectRepository(Medicos)
    private  readonly medicoRepository: Repository<Medicos>,  
    
  
  ){}


  async  create(createDiagnosticoClinicoDto: CreateDiagnosticoClinicoDto, user: ActiveUserInterface) {
    const medico = await this.validateDoctor(createDiagnosticoClinicoDto.idMedico);
    return await this.diagnosticoClinicoRepository.save({
      ...createDiagnosticoClinicoDto,
      medico,
      idMedico: medico.idMed,
      userName: user.name,
  });
}
  private async validateDoctor(idmedico: number) {
     const medicoEntity = await this.medicoRepository.findOneBy({ idMed: idmedico });

      if (!medicoEntity) {
        throw new BadRequestException('Medico no encontrado');
      }

      return medicoEntity;
    }




  async findAll(user: ActiveUserInterface) {
    if (user.role === Role.ADMIN) {
      return await this.diagnosticoClinicoRepository.find();
    
    }

  return await this.diagnosticoClinicoRepository.find({
    where: { userName: user.name },
  });
}


async findOne(id: number, user: ActiveUserInterface) {
  const diagnostico = await this.diagnosticoClinicoRepository.findOneBy({ id });

  if (!diagnostico) {
    throw new BadRequestException('Diagnostico Clinico no encontrado');
  }

  this.validateOwnership(diagnostico, user);

  return diagnostico;
}

private validateOwnership(diagnosticoClinico: DiagnosticoClinico, user: ActiveUserInterface) {
  if (user.role !== Role.ADMIN && diagnosticoClinico.userName !== user.name) {
    throw new UnauthorizedException();
  }
}


async update(id: number, updatediagnosticoclinicoDto: UpdateDiagnosticoClinicoDto, user: ActiveUserInterface) {
  await this.findOne(id, user );
  return await this.diagnosticoClinicoRepository.update(id, {
    ...updatediagnosticoclinicoDto,
   // medicos: updatediagnosticoclinicoDto.idMedico ? this.validateOwnership(updatediagnosticoclinicoDto.userName) : undefined,
    userName: user.name,
  })
}

async remove(id: number, user: ActiveUserInterface) {
  await this.findOne(id, user);
  return await this.diagnosticoClinicoRepository.softDelete({ id });
}

}
