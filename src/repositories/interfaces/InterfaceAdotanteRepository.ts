import AdotanteEntity from "../../entities/AdotanteEntity"

export default interface InterfaceAdotanteRepository {
    criaAdotante(adotante: AdotanteEntity): void | Promise<void>;
    listaAdotantes(): Array<AdotanteEntity> | Promise<AdotanteEntity[]>;
    atualizaAdotante(id: number, adotante: AdotanteEntity): void | Promise<{ success: boolean, message?: string }>;
    deletaAdotante(id: number): void | Promise<{ success: boolean, message?: string }>;
}