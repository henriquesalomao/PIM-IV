import express from "express";
import cors from "cors";

import adminRouter from "./routes/adminRouter";
import registerRouter from "./routes/registerRouter";
import loginRouter from "./routes/loginRouter";
import moedaRouter from "./routes/moedaRouter";
import ordemRouter from "./routes/ordemRouter";
import clienteRouter from "./routes/clienteRouter";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use("/admin", adminRouter);
        this.app.use("/register", registerRouter);
        this.app.use("/login", loginRouter);
        this.app.use("/moedas", moedaRouter);
        this.app.use("/ordens", ordemRouter);
        this.app.use("/cliente", clienteRouter);
    }
}

export default new App().app;
