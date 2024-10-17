import { DiagnosticoClinico } from "src/Apis/diagnostico-clinico/entities/diagnostico-clinico.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CreateMedicoDto } from "../dto/create-medico.dto";


@Entity("medicos")
export class Medicos {


    @PrimaryGeneratedColumn()
    idMed: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    especialidad: string;

    @Column()
    fechaRegristro: Date;

    @DeleteDateColumn()
    eliminado: Date

    @Column()
    userName: string;

    
    @OneToMany(() => DiagnosticoClinico, diagnosticoClinico => diagnosticoClinico.idMedico, {
        eager: true,
        cascade: true
    })
    medicos: CreateMedicoDto[];
}
