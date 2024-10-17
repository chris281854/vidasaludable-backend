import { Module } from '@nestjs/common';
import { DiagnosticoClinicoService } from './diagnostico-clinico.service';
import { DiagnosticoClinicoController } from './diagnostico-clinico.controller';
import { MedicosModule } from '../medicos/medicos.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { DiagnosticoClinico } from './entities/diagnostico-clinico.entity';
import { MedicosService } from '../medicos/medicos.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosticoClinico]),
  MedicosModule,AuthModule],
  controllers: [DiagnosticoClinicoController],
  //providers: [DiagnosticoClinicoService],
   providers: [DiagnosticoClinicoService,MedicosService],
 // exports: [DiagnosticoClinicoService]
})
export class DiagnosticoClinicoModule {}



 