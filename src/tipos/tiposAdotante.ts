import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestParamsAdotante = { id?: string };

type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">;

type TipoResponseBodyAdotante = {
    data?:
    | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">
    | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">[],
    error?: unknown
};

export {
    TipoRequestBodyAdotante,
    TipoResponseBodyAdotante,
    TipoRequestParamsAdotante
}
