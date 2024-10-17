import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDetallepacienteDto } from './dto/create-detallepaciente.dto';
import { UpdateDetallepacienteDto } from './dto/update-detallepaciente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detallepaciente } from './entities/detallepaciente.entity';
import { ActiveUserInterface } from '../../common/interfaces/user-active.interface';
import { Role } from '../../common/enums/rol.enums';


@Injectable()
export class DetallepacientesService {

  constructor(
    
  @InjectRepository(Detallepaciente)
  private readonly detallepacienteRepository: Repository<Detallepaciente>
  ){}


  async create(createDetallepacienteDto: CreateDetallepacienteDto,
    user: ActiveUserInterface,
  ) {
    //const dp = this.detallepacienteRepository.create(createDetallepacienteDto);
    try{
      return await this.detallepacienteRepository.save({
       ...createDetallepacienteDto,
        
        userName: user.name,     
      });

    }catch(error){
      console.log(error);

    }
  }

  async findAll(user: ActiveUserInterface) {
    if (user.role === Role.ADMIN) {
    return await this.detallepacienteRepository.find();
  }
  return await this.detallepacienteRepository.find({
    where: { userName: user.name },
  });
}


  async findOne(idPaciente: string,user: ActiveUserInterface) {
    const dp = await this.detallepacienteRepository.findOneBy({ idPaciente });

  if (!dp) {
    throw new BadRequestException('Cat not found');
  }

  this.validateOwnership(dp, user);

  return dp;
}

private validateOwnership(detallePacientes: Detallepaciente, user: ActiveUserInterface) {
  if (user.role !== Role.ADMIN && detallePacientes.userName !== user.name) {
    throw new UnauthorizedException();
  }
}


  async update(idPaciente: string, updateDetallepacienteDto: UpdateDetallepacienteDto,) {
    return await this.detallepacienteRepository.update(idPaciente,updateDetallepacienteDto);
  }
  
  async remove(idPaciente: string,user: ActiveUserInterface) {
    await this.findOne(idPaciente, user);
    return await this.detallepacienteRepository.softDelete({idPaciente});
    
  }
}
