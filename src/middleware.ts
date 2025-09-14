import type { NextFunction, Request, Response } from "express";
import  Jwt  from "jsonwebtoken";
const JWT_SECRET = "123456"

export const userMiddleware = (req: Request, res:Response, next: NextFunction) => {
    const header = req.headers["authorization"]

    const decoded = Jwt.verify
}