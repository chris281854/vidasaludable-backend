import { Module } from '@nestjs/common';
import { PacModule } from './Apis/pacientes/pac.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallepacientesModule } from './Apis/detallepacientes/detallepacientes.module';
import { UsersModule } from './Apis/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CitaPacModule } from './Apis/cita-pac/cita-pac.module';
import { DiagnosticoClinicoModule } from './Apis/diagnostico-clinico/diagnostico-clinico.module';
import { MedicosModule } from './Apis/medicos/medicos.module';
import * as dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno
@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    }),
    
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: 'localhost',
      port: 3306,
      username:'test',
      password: 'test',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
       
       
      // ssl: process.env.POSTGRES_SSL === "true",
      // extra: {
      //   ssl:
      //     process.env.POSTGRES_SSL === "true"
      //       ? {
      //           rejectUnauthorized: false,
      //         }
      //       : null,
      // },
    }),
    PacModule,
    DetallepacientesModule,
    UsersModule,
    AuthModule,
    CitaPacModule,
    DiagnosticoClinicoModule,
    MedicosModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
