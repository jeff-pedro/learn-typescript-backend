import express, { Response } from "express";
import routes from "./routes";

const app = express();
app.use(express.json());

routes(app);

export default app;
