/* eslint-disable consistent-return */
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const SECRET_KEY = "CRYPTO_COIN_MARKET";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers.Authorization || req.headers.authorization;
    if (!token) return res.status(401).json({ auth: false, message: "No token provided." });

    jwt.verify(token.replace("Bearer ", ""), SECRET_KEY, (err, jwtPayload) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ auth: false, message: "Failed to authenticate token." });
        }
        Object.assign(req, { jwtPayload });
        next();
    });
};

export const signIn = (parameters) => {
    const token = jwt.sign(parameters, SECRET_KEY, { expiresIn: 6000 });
    return token;
};
