import { Request, Response } from "express";

let id = 0;
const listaDePets: any = [];

export default class PetController {
    criaPet(req: Request, res: Response) {
        const novoPet = req.body;
        novoPet.id = this.geraId();
        novoPet.adotado = false;
        listaDePets.push(novoPet);
        return res.status(201).json(novoPet);
    }

    listaPets(req: Request, res: Response) {
        return res.status(201).json(listaDePets);
    }

    geraId() {
        return id += 1;
    }
}