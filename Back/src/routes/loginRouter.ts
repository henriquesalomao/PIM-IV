import express, { Request, Response } from "express";

import LoginController from "../controllers/LoginController";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    try {
        const loginController = new LoginController();
        const temp = await loginController.loginCliente(req.body);
        return res.json(temp);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
});

export default router;
