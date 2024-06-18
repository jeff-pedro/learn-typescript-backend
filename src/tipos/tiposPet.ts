import EnumEspecie from "../enum/EnumEspecie";
import PetEntity from "../entities/PetEntity";

type TipoPet = {
    id: number;
    nome: string;
    dataNascimento: Date;
    especie: EnumEspecie;
    adotado: boolean;
}

type TipoRequestParamsPet = {
    id?: string,
    pet_id?: string,
    adotante_id?: string
};

type TipoRequestBodyPet = Omit<PetEntity, "id">;

type TipoResponseBodyPet = {
    dados?:
    | Pick<PetEntity, "id" | "nome" | "porte" | "especie">
    | Pick<PetEntity, "id" | "nome" | "porte" | "especie">[],
};

export {
    TipoPet,
    TipoRequestBodyPet,
    TipoResponseBodyPet,
    TipoRequestParamsPet
}

