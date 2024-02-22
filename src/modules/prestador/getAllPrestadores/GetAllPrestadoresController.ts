import { NextFunction, Request, Response } from "express";
import { GetAllPrestadoresUseCase } from "./GetAllPrestadoreUseCase";

export class GetAllPrestadoresController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const prestadores = await GetAllPrestadoresUseCase.execute()

        if (!prestadores) {
            return res.status(500).json({ success: false, message: 'Internal server error!' })
        }

        if (!prestadores[0]) {
            return res.status(400).json({ success: false, data: prestadores })
        }

        return res.status(200).json({ success: true, data: prestadores })
    }
}