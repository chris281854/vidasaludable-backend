import { Module } from '@nestjs/common';
import { DetallepacientesService } from './detallepacientes.service';
import { DetallepacientesController } from './detallepacientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detallepaciente } from './entities/detallepaciente.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Detallepaciente]),AuthModule],
  controllers: [DetallepacientesController],
  providers: [DetallepacientesService],
  exports: [TypeOrmModule]
})
export class DetallepacientesModule {}
