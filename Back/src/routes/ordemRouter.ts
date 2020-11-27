import express, { Request, Response } from "express";

import OrdemController from "../controllers/OrdemController";
import { verifyJWT } from "../auth";

const router = express.Router();

router.post("/deposito", verifyJWT, async (req: Request, res: Response) => {
    try {
        const { body, jwtPayload } = (<any>req);
        const ordemController = new OrdemController();
        const temp = await ordemController.deposito(body, jwtPayload);
        return res.json(temp);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
});

router.post("/transferencia", verifyJWT, async (req: Request, res: Response) => {
    try {
        const { body, jwtPayload } = (<any>req);

        const ordemController = new OrdemController();
        const temp = await ordemController.novaTransferencia(body, jwtPayload);
        return res.json(temp);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
});

router.post("/saque", verifyJWT, async (req: Request, res: Response) => {
    try {
        const { body, jwtPayload } = (<any>req);
        const ordemController = new OrdemController();
        const temp = await ordemController.saque(body, jwtPayload);
        return res.json(temp);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
});

router.get("/extrato", verifyJWT, async (req: Request, res: Response) => {
    try {
        const { jwtPayload } = (<any>req);
        const ordemController = new OrdemController();
        const temp = await ordemController.extrato(jwtPayload);
        return res.json(temp);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
});

export default router;
