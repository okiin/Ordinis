import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";

export const HandleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(err.message)
    } else if (err) {
        return res.status(500).json({ success: false, message: "Erro Interno do servidor!" })
    }
}