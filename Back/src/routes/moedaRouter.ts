import express, { Request, Response } from "express";

import MoedaController from "../controllers/MoedaController";
import { verifyJWT } from "../auth";

const router = express.Router();

router.post("/valores", verifyJWT, async (req: Request, res: Response) => {
    try {
        const moedaController = new MoedaController();
        const { body } = req;
        console.log((<any>req).jwtPayload);

        const temp = await moedaController.getValues(body);
        return res.json(temp);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
});

export default router;
