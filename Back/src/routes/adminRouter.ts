import express, { Request, Response } from "express";

import AdminController from "../controllers/AdminController";
import { verifyJWT } from "../auth";

const router = express.Router();

router.get("/sync", verifyJWT, async (req: Request, res: Response) => {
    try {
        const adminController = new AdminController();
        const temp = await adminController.sync();
        return res.json(temp);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
});

router.post("/novaMoeda", verifyJWT, async (req: Request, res: Response) => {
    try {
        const adminController = new AdminController();
        const temp = await adminController.novaMoeda(req.body);
        return res.json(temp);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
});

export default router;
