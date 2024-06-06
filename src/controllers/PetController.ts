import { Request, Response } from "express"
import type TipoPet from "../tipos/TipoPet"
import EnumEspecie from "../enum/EnumEspecie"
import PetRepository from "../repositories/PetRepository"
import PetEntity from "../entities/PetEntity"

function geraId() {
    return id += 1
}

let id = 0
const listaDePets: Array<TipoPet> = []

export default class PetController {
    constructor(private repository: PetRepository) { }

    async criaPet(req: Request, res: Response) {
        const { nome, dataNascimento, especie } = <PetEntity>req.body

        if (!nome || !dataNascimento || !especie) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" })
        }

        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ error: "Espécie inválida" })
        }

        const novoPet = new PetEntity();
        (novoPet.nome = nome),
            (novoPet.especie = especie),
            (novoPet.dataNascimento = dataNascimento),
            (novoPet.adotado = false),
            await this.repository.criaPet(novoPet)

        return res.status(201).json(novoPet)
    }

    async listaPets(req: Request, res: Response) {
        const listaDePets = await this.repository.listaPets()
        return res.status(200).json(listaDePets)
    }

    async atualizaPet(req: Request, res: Response) {
        const { id } = req.params
        const newData = req.body as TipoPet

        const pet = await this.repository.atualizaPet(Number(id), newData)

        if (!pet) {
            return res.status(404).json({ error: "Pet não encontrado" })
        }

        res.status(200).json(pet)
    }

    async deletaPet(req: Request, res: Response) {
        const { id } = req.params

        const pet = await this.repository.deletaPet(Number(id))
        if (!pet) {
            return res.status(404).json({ error: "Pet não encontrado" })
        }

        return res.status(200).json({ message: "Pet deletado com sucesso" })
    }
}