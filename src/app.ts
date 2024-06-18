import "express-async-errors";
import express, { Response } from "express";
import routes from "./routes";
import { AppDataSource } from "./config/dataSource";
import { erroMiddleware } from "./middleware/erro";

AppDataSource.initialize()
    .then(() => {
        console.log("DataSource inicializado com sucesso!");
    }).catch((error: Error) => {
        console.log(error);
    });

const app = express();
app.use(express.json());

routes(app);

app.use(erroMiddleware);

export default app;
