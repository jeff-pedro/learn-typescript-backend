import { Response, Router } from "express";
import petRouter from "./petRoute";
import adotanteRouter from "./adotanteRoute"

const router = (app: Router) => {
    app.route("/").get((_, res: Response) => {
        res.send("Bem vindo ao curso de TypeScript!");
    });

    app.use("/pets", petRouter);
    app.use("/adotantes", adotanteRouter);
};

export default router;
