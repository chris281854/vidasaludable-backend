//import { User } from "../../users/entities/user.entity";
import { CreateDetallepacienteDto } from "../../detallepacientes/dto/create-detallepaciente.dto";
import { Detallepaciente } from "../../detallepacientes/entities/detallepaciente.entity";
import { Entity, Column, DeleteDateColumn,   OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("pacientes")
export class Paciente {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rup: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    sexo: string;

    @Column()
    ciudad: string;

    @Column({name: "fecha_nacimiento",type: "date"})
    nacimiento: Date;

    @Column({name: "fecha_registro",type: "datetime"})
    registro: Date;

    @Column({default: "VIGENTE"})
    estado: string;

    @DeleteDateColumn()
    eliminado: Date

    @Column({name:"fecha_modificacion", type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    modificacion: Date;

    @Column({name: "user_name_pac"})
    userNamepac: string;


    @OneToMany(() => Detallepaciente, detallepaciente => detallepaciente.paciente, {
      eager: true,
      cascade: true
  })
  detallepaciente: CreateDetallepacienteDto[];

 
}


