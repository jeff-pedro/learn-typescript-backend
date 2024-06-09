import { Router } from "express";
import PetController from "../controllers/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";

const router = Router();
const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdotanteEntity")
);
const petController = new PetController(petRepository);

router
    .post("/", petController.criaPet.bind(petController))
    .get("/", (req, res) => petController.listaPets(req, res))
    // .get("/filtroPorte", (req, res) => petController.buscaPetPeloPorte(req, res))
    .get("/filtro", (req, res) => petController.buscaPetPorCampoGenerico(req, res))
    .put("/:id", (req, res) => petController.atualizaPet(req, res))
    .put("/:pet_id/:adotante_id", (req, res) => petController.adotaPet(req, res))
    .delete("/:id", (req, res) => petController.deletaPet(req, res));

export default router;
