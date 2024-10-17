import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePacDto } from './dto/create-pac.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from './entities/vs.entity';
import { Detallepaciente } from '../detallepacientes/entities/detallepaciente.entity';
import { ActiveUserInterface } from '../../common/interfaces/user-active.interface';
import { Role } from '../../common/enums/rol.enums';
import { UpdatePacDto } from './dto/update-pac.dto';


 
@Injectable()
export class PacienteService {

  constructor(

    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    
    @InjectRepository(Detallepaciente)
    private readonly detallepacienteRepository: Repository<Detallepaciente>
  
  ){}


  async create(createPacDto: CreatePacDto) {
  const pac = this.pacienteRepository.create({
    ...createPacDto,
    detallepaciente: createPacDto.detallepaciente.map(detalleDto => {
      const detalle = this.detallepacienteRepository.create({
        userName: detalleDto.userName,
        idPaciente: detalleDto.idPaciente,
        objetivo: detalleDto.objetivo,
        motivo: detalleDto.motivo,
        fechaRegistro: detalleDto.fechaRegistro,
        fechaModificacion: detalleDto.fechaModificacion,
        estado: detalleDto.estado

    });
      return detalle;
    }),
  });
 
    try{
      return await this.pacienteRepository.save(pac);    
  
    }catch(error){
      console.log(error);
      throw new BadRequestException('No se pudo crear el paciente');

    }
   }


  async findAll(user : ActiveUserInterface) {
    if (user.role === Role.ADMIN) {
      return await this.pacienteRepository.find();
    }
  
    return await this.pacienteRepository
    .createQueryBuilder('paciente')
    .leftJoinAndSelect('paciente.detallepaciente', 'detallepaciente')
    .where('detallepaciente.userName = :userName', { userName: user.name })
    .getMany();
  }


  async findOne(rup: string, user: ActiveUserInterface) {
    const paciente = await this.pacienteRepository.findOne({
      where: { rup },
      relations: ['detallepaciente'],
    });
  
    if (!paciente) {
      throw new NotFoundException(`Paciente con RUP ${rup} no encontrado.`);
    } else if (paciente.eliminado != null) {
      throw new NotFoundException(`El paciente con RUP ${rup} ha sido eliminado en fecha ${paciente.eliminado}.`);
    }
  
    // Validar la propiedad del paciente para usuarios no administradores
    this.validateOwnership(paciente, user);
  
    return paciente;
  }
  
  private validateOwnership(paciente: Paciente, user: ActiveUserInterface) {
    if (user.role !== Role.ADMIN && paciente.userNamepac !== user.name) {
      // Validamos si el paciente tiene detalles con el nombre del usuario
      const isOwner = paciente.detallepaciente.some(detalle => detalle.userName === user.name);
  
      // Si no es el propietario, lanzamos la excepción
      if (!isOwner) {
        console.error(`User ${user.name} no es el propietario del paciente con RUP ${paciente.rup}`);
        throw new UnauthorizedException('No tiene permisos para acceder a este paciente.');
      }
    }
  
    // Mensaje de depuración si pasa la validación
    console.log(`Acceso permitido para el usuario ${user.name} al paciente con RUP ${paciente.rup}`);
  }
  
  
  
  // Método de actualización verificar ya que se estan duplicando los datos en la API 
  async update(rup: string, updatePacDto: UpdatePacDto, user: ActiveUserInterface) {
    // 1. Recuperar el paciente existente con sus detalles
    const paciente = await this.findOne(rup, user);

    // 2. Excluir campos no actualizables desde el DTO (rup)
    const { ...updateData } = updatePacDto;

    // 3. Actualizar las propiedades básicas del paciente
    Object.assign(paciente, updateData);

    // 4. Procesar y actualizar los detalles del paciente
    if (updatePacDto.detallepaciente && Array.isArray(updatePacDto.detallepaciente)) {
      for (const detalleDto of updatePacDto.detallepaciente) {
        if (detalleDto.idPaciente) { // Si tiene 'id', es un detalle existente
          const detalle = await this.detallepacienteRepository.findOne({
            where: { idPaciente: detalleDto.idPaciente, paciente: { rup } },
          });

          if (detalle) {
            // Actualizar el detalle existente
            Object.assign(detalle, {
              objetivo: detalleDto.objetivo,
              motivo: detalleDto.motivo,
              fechaRegistro: detalleDto.fechaRegistro,
              fechaModificacion: new Date(),
              estado: detalleDto.estado,
              userName: user.name,
            });
            await this.detallepacienteRepository.save(detalle);
          } else {
            throw new BadRequestException(`DetallePaciente con id ${detalleDto.idPaciente} no encontrado para el paciente ${rup}.`);
          }
        } else {
          // Crear un nuevo detalle si no tiene 'id'
          const nuevoDetalle = this.detallepacienteRepository.create({
            objetivo: detalleDto.objetivo,
            motivo: detalleDto.motivo,
            fechaRegistro: detalleDto.fechaRegistro || new Date(),
            fechaModificacion: new Date(),
            estado: detalleDto.estado,
            userName: user.name,
            paciente: paciente, // Asociar al paciente existente
          });

          await this.detallepacienteRepository.save(nuevoDetalle);
        }
      }
    }

    // 5. Guardar el paciente actualizado
    try {
      const updatedPaciente = await this.pacienteRepository.save(paciente);
      return {
        message: `Paciente con RUP ${rup} actualizado correctamente.`,
        paciente: updatedPaciente,
      };
    } catch (error) {
      throw new BadRequestException(`Error al actualizar el paciente: ${error.message}`);
    }
  }

  
  

  async remove(rup: string, user: ActiveUserInterface) {
    await this.findOne(rup, user);
     return await this.pacienteRepository.softDelete({ rup });
    const result = await this.pacienteRepository.softDelete(rup);
    if (result.affected === 0) {
      console.log(result);

        throw new BadRequestException(`No se pudo eliminar el paciente con id ${rup}`);
    }
  }
}
