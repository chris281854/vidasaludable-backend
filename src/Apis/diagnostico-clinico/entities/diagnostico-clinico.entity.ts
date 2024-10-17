import { Medicos } from "../../medicos/entities/medico.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";

@Entity("diagnostico_clinico")
export class DiagnosticoClinico {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rup: string;

    @Column({length: 500, type: "varchar"})
    analiticas: string;

    @Column({name:"resultados_observaciones", length: 500, type: "varchar"})
    resultados: string;

    @Column({name:"conclusiones_medicas", length: 500, type: "varchar"})
    conclusionMedica: string;

    @Column({name: "requiere_seguimiento", type: "boolean", default: false})
    seguimiento: boolean;

    @Column({name:"fecha_proxima_visita", type: "date"})
    proximaVisita: Date;

    @Column({
        name: "prioridad_diagnostico",
        type: "enum",
        enum: ["ALTA", "MEDIA", "BAJA"],
        default: "BAJA"
      })
      prioridad: string;

    @Column({name: "observaciones_prioridad", length: 500, type: "varchar"})
    observacionesPriodidad: string;

    @Column({name:"id_medico"})
    idMedico: number;

    // @Column("id_especialidad")
    // idEspecialidad: number;

    @Column({name: "fecha_diagnostico", default:  () => "CURRENT_TIMESTAMP",  nullable: true})
    fechaDiagnostico: Date;

   

    @Column({name:"fecha_modificacion", type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    fechaModificacion: Date;
    
      
  
      
    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    userName: string;

   // Relación con Paciente
   @ManyToOne(() => Medicos, medicos => medicos.medicos, { onDelete: 'CASCADE' })
   //medicos: Medicos;

   @ManyToOne(() => Medicos)
   @JoinColumn({ name: 'idMedico', referencedColumnName: 'idMed',  })
   medicos: Medicos;
    

 







}
