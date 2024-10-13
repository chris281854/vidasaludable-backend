import { Module } from '@nestjs/common';
import { PacModule } from './pacientes/pac.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallepacientesModule } from './detallepacientes/detallepacientes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
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
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
