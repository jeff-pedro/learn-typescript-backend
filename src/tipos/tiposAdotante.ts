import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestParamsAdotante = { id?: string };

type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">;

type TipoResponseBodyAdotante = {
    dados?:
    | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">
    | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">[],
    erros?: unknown
};

export {
    TipoRequestBodyAdotante,
    TipoResponseBodyAdotante,
    TipoRequestParamsAdotante
}
