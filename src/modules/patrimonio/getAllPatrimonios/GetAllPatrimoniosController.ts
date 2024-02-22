import { NextFunction, Request, Response } from "express";
import { GetAllPatrimoniosUseCase } from "./GetAllPatrimoniosUseCase";

export class GetAllPatrimoniosController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const patrimonios = await GetAllPatrimoniosUseCase.execute()

        if (!patrimonios) {
            return res.status(500).json({ success: false, message: 'Erro interno do servidor.' })
        }

        if (!patrimonios[0]) {
            return res.status(400).json({ success: false, data: patrimonios })
        }

        return res.status(200).json({ success: true, data: patrimonios })
    }
}