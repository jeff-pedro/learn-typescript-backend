import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository"
import AdotanteEntity from "../entities/AdotanteEntity";
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
    ) {
        const petToUpdate = await this.petRepository.findOne({ where: { id } });
        if (!petToUpdate) {
            throw new NaoEncontrado("Pet não encontrado");
        }

        Object.assign(petToUpdate, newData)

        await this.petRepository.save(petToUpdate);

        return { success: true }
    }
    async deletaPet(id: number) {
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
    ) {
        const pet = await this.petRepository.findOneBy({ id: pet_id })
        if (!pet) {
            throw new NaoEncontrado("Pet não encontrado");
        }

        const adotante = await this.adotanteRepository.findOneBy({ id: adotante_id })
        if (!adotante) {
            throw new NaoEncontrado("Adotante não encontrado");
        }

        pet.adotante = adotante;
        pet.adotado = true;

        await this.petRepository.save(pet)

        return { success: true }
    }

    async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
        campo: Tipo,
        valor: PetEntity[Tipo]
    ): Promise<PetEntity[]> {
        return await this.petRepository.find({ where: { [campo]: valor } })
    }
}