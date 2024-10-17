import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Paciente } from "../../pacientes/entities/vs.entity";
import { IsPositive } from "class-validator";
import { User } from "../../users/entities/user.entity";

@Entity("detalle_pacientes")
export class Detallepaciente {

    @Column({primary: true, generated: true})
    @IsPositive()
    idDetalle: number;

    @Column({name: "id_paciente" , length: 10})
    idPaciente: string;


    @Column({length: 300})
    objetivo: string;

    @Column({length: 300})
    motivo: string;

    @Column({name: "fecha_registro"})
    fechaRegistro: Date;

    @Column({name: "fecha_modificacion", type: "datetime"})
    fechaModificacion: Date;

    @Column({default: "VIGENTE"})
    estado: string;

    @DeleteDateColumn({type: "datetime"})
    eliminado: Date;

   // Relación con Paciente
   @ManyToOne(() => Paciente, paciente => paciente.detallepaciente, { onDelete: 'CASCADE' })
   paciente: Paciente;

   @ManyToOne(() => User)
   @JoinColumn({ name: 'userName', referencedColumnName: 'name',  })
   user: User;
    

   @Column()
   userName: string;
}

