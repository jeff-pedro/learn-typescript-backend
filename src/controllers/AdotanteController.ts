import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { TipoRequestBodyAdotante, TipoResponseBodyAdotante } from "../tipos/TiposAdotante";

export default class AdotanteController {
    constructor(private repository: AdotanteRepository) { }

    async criaAdotante(
        req: Request<{}, {}, TipoRequestBodyAdotante>,
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
        return res.status(201).json({ data: { id: novoAdotante.id, nome, celular } });
    }

    async listaAdotante(req: Request, res: Response) {
        const listaDeAdotantes = await this.repository.listaAdotantes()
        return res.json(listaDeAdotantes)
    }

    async atualizaAdotante(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaAdotante(
            Number(id),
            req.body as AdotanteEntity
        );

        if (!success) {
            return res.status(404).json({ message });
        }

        return res.status(204).json();
    }

    async deletaAdotante(req: Request, res: Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletaAdotante(Number(id));

        if (!success) {
            return res.status(404).json({ message });
        }

        return res.status(204).json();
    }

    async atualizaEnderecoAdotante(req: Request, res: Response) {
        const { id } = req.params;
        const endereco = req.body as EnderecoEntity

        const { success, message } = await this.repository.atualizaEnderecoAdotante(
            Number(id),
            endereco
        );

        if (!success) {
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }
}