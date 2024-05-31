import { Request, Response, Router } from "express";
import PetController from "../controllers/PetController";

const router = Router();

const petController = new PetController();

router
    .post("/", (req: Request, res: Response) => petController.criaPet(req, res))
    .get("/", (req: Request, res: Response) => petController.listaPets(req, res));

export default router;