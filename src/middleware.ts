import type { NextFunction, Request, Response } from "express";
import  Jwt, { decode }  from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";


export const userMiddleware = (req: Request, res:Response, next: NextFunction) => {
    const header = req.headers["authorization"]

    const decoded = Jwt.verify(header as string, JWT_SECRET);
    
    if(decoded) {
        // @ts-ignore
        req.userId = decoded._id
        next()
    } else {
        res.status(403).json({
            message: "you are not logged in"
        })
    }
}