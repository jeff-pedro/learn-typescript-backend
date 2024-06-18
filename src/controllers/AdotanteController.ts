import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { TipoRequestBodyAdotante, TipoRequestParamsAdotante, TipoResponseBodyAdotante } from "../tipos/tiposAdotante";

export default class AdotanteController {
    constructor(private repository: AdotanteRepository) { }

    async criaAdotante(
        req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
        res: Response<TipoResponseBodyAdotante>
    ) {
        const { nome, senha, celular, endereco, foto } = req.body;

        const novoAdotante = new AdotanteEntity(
            nome,
            senha,
            celular,
            foto,
            endereco,
        );

        await this.repository.criaAdotante(novoAdotante);
        return res.status(201).json({ dados: { id: novoAdotante.id, nome, celular } });
    }

    async listaAdotante(
        req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
        res: Response<TipoResponseBodyAdotante>
    ) {
        const listaDeAdotantes = await this.repository.listaAdotantes()
        const dados = listaDeAdotantes.map((adotante) => {
            return {
                id: adotante.id,
                nome: adotante.nome,
                celular: adotante.celular,
                endereco: adotante.endereco !== null ? adotante.endereco : undefined
            }
        })
        return res.json({ dados })
    }

    async atualizaAdotante(
        req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
        res: Response<TipoResponseBodyAdotante>
    ) {
        const { id } = req.params;
        await this.repository.atualizaAdotante(
            Number(id),
            req.body as AdotanteEntity
        );

        return res.status(204).json();
    }

    async deletaAdotante(
        req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
        res: Response<TipoResponseBodyAdotante>
    ) {
        const { id } = req.params;

        await this.repository.deletaAdotante(Number(id));

        return res.status(204).json();
    }

    async atualizaEnderecoAdotante(
        req: Request<TipoRequestParamsAdotante, {}, EnderecoEntity>,
        res: Response<TipoResponseBodyAdotante>
    ) {
        const { id } = req.params;

        await this.repository.atualizaEnderecoAdotante(
            Number(id),
            req.body
        );

        return res.sendStatus(204);
    }
}