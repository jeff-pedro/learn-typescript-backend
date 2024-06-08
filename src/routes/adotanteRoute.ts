import { Router } from "express";
import AdotanteController from "../controllers/AdotanteController";
import { AppDataSource } from "../config/dataSource";
import AdotanteRepository from "../repositories/AdotanteRepository";

const router = Router();
const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("AdotanteEntity"))
const adotanteController = new AdotanteController(adotanteRepository)

router
    .post("/", (req, res) => adotanteController.criaAdotante(req, res))
    .get("/", (req, res) => adotanteController.listaAdotante(req, res))
    .put("/:id", (req, res) => adotanteController.atualizaAdotante(req, res))
    .delete("/:id", (req, res) => adotanteController.deletaAdotante(req, res));

export default router;
