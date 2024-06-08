import AdotanteEntity from "../../entities/AdotanteEntity"
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface InterfaceAdotanteRepository {
    criaAdotante(adotante: AdotanteEntity): void | Promise<void>;
    listaAdotantes(): Array<AdotanteEntity> | Promise<AdotanteEntity[]>;
    atualizaAdotante(id: number, adotante: AdotanteEntity): void | Promise<{ success: boolean, message?: string }>;
    deletaAdotante(id: number): void | Promise<{ success: boolean, message?: string }>;
    atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): void | Promise<{ success: boolean, message?: string }>
}