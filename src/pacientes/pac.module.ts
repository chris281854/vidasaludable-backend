import { Module } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { PacController } from './pac.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './entities/vs.entity';
import { DetallepacientesModule } from 'src/detallepacientes/detallepacientes.module';
import { DetallepacientesService } from 'src/detallepacientes/detallepacientes.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente]),DetallepacientesModule,AuthModule],
  controllers: [PacController],
  providers: [PacienteService,DetallepacientesService],
})
export class PacModule {}
