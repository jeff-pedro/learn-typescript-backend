import { Response, Router } from "express";
import petRouter from "./petRoute";

const router = (app: Router) => {
    app.route("/").get((_, res: Response) => {
        res.send("Bem vindo ao curso de TypeScript!");
    });

    app.use("/pets", petRouter);
};

export default router;
