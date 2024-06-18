import { RequestHandler, Router } from "express";
import AdotanteController from "../controllers/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyAdotante } from "../middleware/validadores/adotanteRequestBody";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { verificaIdMiddleware } from "../middleware/verificaId";

const router = Router();
const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("AdotanteEntity"));
const adotanteController = new AdotanteController(adotanteRepository);

const bodyValidateAdotante: RequestHandler = (req, res, next) =>
    middlewareValidadorBodyAdotante(req, res, next);

const bodyValidateEndereco: RequestHandler = (req, res, next) =>
    middlewareValidadorBodyEndereco(req, res, next);


router
    .post("/",
        bodyValidateAdotante,
        (req, res) => adotanteController.criaAdotante(req, res))

    .get("/", (req, res) => adotanteController.listaAdotante(req, res))

    .put("/:id",
        verificaIdMiddleware,
        (req, res) => adotanteController.atualizaAdotante(req, res))

    .patch("/:id",
        verificaIdMiddleware,
        bodyValidateEndereco, (req, res) => adotanteController.atualizaEnderecoAdotante(req, res))

    .delete("/:id", verificaIdMiddleware, (req, res) => adotanteController.deletaAdotante(req, res));

export default router;
