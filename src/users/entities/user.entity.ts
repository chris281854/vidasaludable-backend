import { IsDateString, IsEmail, IsString } from "class-validator";
import { Role } from "../../common/enums/rol.enums";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 20, type: "varchar", nullable: false, unique: true})
    @IsString()
    name: string;

    @Column({nullable: false})
    @IsEmail()
    email: string;

    @Column({nullable: false, select: false})
    password: string;
    
    @Column({type: "enum", default: Role.USER, enum: Role})
    role: Role;
    
    @Column({default: false, type: "date"})
    @IsDateString()
    createdAt: Date;

    @Column({default: false})
    @IsDateString()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}


