import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateDetallepacienteDto } from './create-detallepaciente.dto';

export class UpdateDetallepacienteDto extends PartialType(OmitType(CreateDetallepacienteDto,['idPaciente'] as const)) {}


 