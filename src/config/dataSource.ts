import "dotenv/config"
import "reflect-metadata"
import { DataSource } from "typeorm"
import PetEntity from "../entities/PetEntity"
import AdotanteEntity from "../entities/AdotanteEntity"
import EnderecoEntity from "../entities/EnderecoEntity"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/config/database.sqlite",
    synchronize: true,
    logging: false,
    entities: [
        PetEntity,
        AdotanteEntity,
        EnderecoEntity
    ],
    migrations: [],
    subscribers: []
})