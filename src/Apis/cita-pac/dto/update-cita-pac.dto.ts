import { PartialType } from '@nestjs/swagger';
import { CreateCitaPacDto } from './create-cita-pac.dto';

export class UpdateCitaPacDto extends PartialType(CreateCitaPacDto) {}
