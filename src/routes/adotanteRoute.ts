import { RequestHandler, Router } from "express";
import AdotanteController from "../controllers/AdotanteController";
import { AppDataSource } from "../config/dataSource";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { middlewareValidadorBodyAdotante } from "../middleware/validadores/adotanteRequestBody";

const router = Router();
const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("AdotanteEntity"));
const adotanteController = new AdotanteController(adotanteRepository);
const bodyValidate: RequestHandler = (req, res, next) =>
    middlewareValidadorBodyAdotante(req, res, next);

router
    .post("/", bodyValidate,
        (req, res) => adotanteController.criaAdotante(req, res)
    )
    .get("/", (req, res) => adotanteController.listaAdotante(req, res))
    .put("/:id", (req, res) => adotanteController.atualizaAdotante(req, res))
    .patch("/:id", (req, res) => adotanteController.atualizaEnderecoAdotante(req, res))
    .delete("/:id", (req, res) => adotanteController.deletaAdotante(req, res));

export default router;
