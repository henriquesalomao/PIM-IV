import express, { Request, Response } from "express";

import ClienteController from "../controllers/ClienteController";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const ordemController = new ClienteController();
        const temp = await ordemController.register(req.body);
        return res.json(temp);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
});

export default router;
