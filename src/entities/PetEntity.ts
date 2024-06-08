import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nome?: string;
    @Column()
    especie?: EnumEspecie;
    @Column({ nullable: true })
    dataNascimento?: Date;
    @Column({ default: false })
    adotado?: boolean;

    constructor(
        nome?: string,
        especie?: EnumEspecie,
        dataNascimento?: Date,
        adotado?: true
    ) {
        this.nome = nome;
        this.especie = especie;
        this.dataNascimento = dataNascimento;
        this.adotado = adotado;
    }
}