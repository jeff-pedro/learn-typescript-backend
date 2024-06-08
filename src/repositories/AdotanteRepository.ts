import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
    constructor(private repository: Repository<AdotanteEntity>) { }

    async criaAdotante(adotante: AdotanteEntity): Promise<void> {
        await this.repository.save(adotante);
    }

    async listaAdotantes(): Promise<AdotanteEntity[]> {
        return this.repository.find();
    }

    async atualizaAdotante(
        id: number,
        newData: AdotanteEntity
    ): Promise<{ success: boolean; message?: string | undefined; }> {
        try {
            const adotanteToUpdate = await this.repository.findOneBy({ id });

            if (!adotanteToUpdate) {
                return { success: false, message: "Adotante não encontrado" }
            }

            Object.assign(adotanteToUpdate, newData)

            await this.repository.save(adotanteToUpdate)

            return { success: true }
        } catch (error) {
            return {
                success: false,
                message: 'Ocorreu um erro ao tentar atualizar o adotante'
            }
        }
    }

    async deletaAdotante(id: number): Promise<{ success: boolean; message?: string | undefined; }> {
        try {
            const adotanteToRemove = await this.repository.findOneBy({ id });

            if (!adotanteToRemove) {
                return { success: false, message: "Adotante não encontrado" }
            }

            await this.repository.remove(adotanteToRemove);

            return { success: true }
        } catch (error) {
            return {
                success: false,
                message: 'Ocorreu um erro ao tentar deletar o adotante'
            }
        }
    }

}