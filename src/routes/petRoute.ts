import { Request, RequestHandler, Router } from "express";
import PetController from "../controllers/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyPet } from "../middleware/validadores/petRequestBody";
import { verificaIdMiddleware } from "../middleware/verificaId";

const router = Router();
const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdotanteEntity")
);
const petController = new PetController(petRepository);

const bodyValidatePet: RequestHandler = (req, res, next) => {
    middlewareValidadorBodyPet(req, res, next);
}

router
    .post("/",
        bodyValidatePet,
        petController.criaPet.bind(petController))

    .get("/", (req, res) => petController.listaPets(req, res))

    .get("/filtro", (req, res) => petController.buscaPetPorCampoGenerico(req, res))

    .put("/:id",
        verificaIdMiddleware,
        (req, res) => petController.atualizaPet(req, res))

    .put("/:pet_id/:adotante_id",
        verificaIdMiddleware,
        (req, res) => petController.adotaPet(req, res))

    .delete("/:id",
        verificaIdMiddleware,
        (req, res) => petController.deletaPet(req, res));

export default router;
