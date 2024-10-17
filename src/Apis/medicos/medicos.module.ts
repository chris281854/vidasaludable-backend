import {  Module } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Medicos } from './entities/medico.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Medicos]),AuthModule],
  controllers: [MedicosController],
  providers: [MedicosService],
  exports: [TypeOrmModule]
})
export class MedicosModule {}
