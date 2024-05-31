import EnumEspecie from "../enum/EnumEspecie";

type TipoPet = {
    id: number;
    nome: string;
    dataNascimento: Date;
    especie: EnumEspecie;
    adotado: boolean;
}

export default TipoPet;