import express, { Request, Response } from "express";

import ClienteController from "../controllers/ClienteController";
import { verifyJWT } from "../auth";

const router = express.Router();

router.get("/dados", verifyJWT, async (req: Request, res: Response) => {
    try {
        const { jwtPayload } = (<any>req);
        const clienteController = new ClienteController();
        const temp = await clienteController.dados(jwtPayload);
        return res.json(temp);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
});

export default router;
