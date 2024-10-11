import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePacDto } from './create-pac.dto';

export class UpdatePacDto extends PartialType(  OmitType(CreatePacDto, ['rup'] as const),) {
    
}
