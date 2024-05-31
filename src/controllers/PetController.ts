import { Request, Response } from "express"
import type TipoPet from "../tipos/TipoPet"
import EnumEspecie from "../enum/EnumEspecie"

function geraId() {
    return id += 1
}

let id = 0
const listaDePets: Array<TipoPet> = []

export default class PetController {
    criaPet(req: Request, res: Response) {
        const { nome, dataNascimento, especie } = <TipoPet>req.body

        if (!nome || !dataNascimento || !especie) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" })
        }

        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ error: "Espécie inválida" })
        }

        const novoPet = {
            id: geraId(),
            nome,
            especie,
            dataNascimento,
            adotado: false,
        }

        listaDePets.push(novoPet)

        return res.status(201).json(novoPet)
    }

    listaPets(req: Request, res: Response) {
        return res.status(200).json(listaDePets)
    }

    atualizaPet(req: Request, res: Response) {
        const { id } = req.params
        const { nome, dataNascimento, especie } = req.body as TipoPet

        const pet = listaDePets.find((pet) => pet.id === Number(id))
        if (!pet) {
            return res.status(404).json({ error: "Pet não encontrado" })
        }

        pet.nome = nome
        pet.especie = especie
        pet.dataNascimento = dataNascimento

        res.status(200).json(pet)
    }

    deletaPet(req: Request, res: Response) {
        const { id } = req.params

        const pet = listaDePets.find((pet) => pet.id === Number(id))
        if (!pet) {
            return res.status(404).json({ error: "Pet não encontrado" })
        }

        const index = listaDePets.indexOf(pet)
        listaDePets.splice(index, 1)
        return res.status(200).json({ message: "Pet deletado com sucesso" })
    }
}