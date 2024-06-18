import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository"
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";
import { NaoEncontrado } from "../utils/manipulaErros";

export default class PetRepository implements InterfacePetRepository {
    private petRepository: Repository<PetEntity>;
    private adotanteRepository: Repository<AdotanteEntity>;

    constructor(
        petRepository: Repository<PetEntity>,
        adotanteRepository: Repository<AdotanteEntity>
    ) {
        this.petRepository = petRepository;
        this.adotanteRepository = adotanteRepository;
    }

    async criaPet(pet: PetEntity): Promise<void> {
        await this.petRepository.save(pet)
    }

    async listaPets(): Promise<PetEntity[]> {
        return await this.petRepository.find();
    }

    async atualizaPet(
        id: number,
        newData: PetEntity
    ): Promise<{ success: boolean; message?: string; }> {
        const petToUpdate = await this.petRepository.findOne({ where: { id } });
        if (!petToUpdate) {
            throw new NaoEncontrado("Pet não encontrado");
        }

        Object.assign(petToUpdate, newData)

        await this.petRepository.save(petToUpdate);

        return { success: true }
    }
    async deletaPet(id: number): Promise<{ success: boolean; message?: string; }> {
        const petToRemove = await this.petRepository.findOneBy({ id });
        if (!petToRemove) {
            throw new NaoEncontrado("Pet não encontrado");
        }

        await this.petRepository.remove(petToRemove);

        return { success: true }
    }

    async adotaPet(
        pet_id: number,
        adotante_id: number
    ): Promise<{ success: boolean, message?: string }> {
        const pet = await this.petRepository.findOneBy({ id: pet_id })
        if (!pet) {
            throw new NaoEncontrado("Pet não encontrado");
        }

        const adotante = await this.adotanteRepository.findOneBy({ id: adotante_id })
        if (!adotante) {
            return { success: false, message: "Adotante não encontrado" };
        }

        // Object.assign(pet, { adotado: true, adotante })
        pet.adotante = adotante;
        pet.adotado = true;

        await this.petRepository.save(pet)

        return { success: true }
    }

    // async listaPetsPorFiltro(where: object): Promise<PetEntity[]> {
    //     return await this.petRepository.find(where);
    // }

    // async buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> {
    //     return await this.petRepository.find({ where: { porte } });
    // }

    async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
        campo: Tipo,
        valor: PetEntity[Tipo]
    ): Promise<PetEntity[]> {
        return await this.petRepository.find({ where: { [campo]: valor } })
    }
}