import { NextFunction, Request, Response } from "express";
import { GetPatrimoniosRuinsUseCase } from "./GetPatrimoniosRuinsUseCase";

export class GetPatrimoniosRuinsController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const patrimonios = await GetPatrimoniosRuinsUseCase.execute()

        if (!patrimonios) {
            return res.status(500).json({ success: false, message: 'Erro interno do servidor.' })
        }

        if (!patrimonios[0]) {
            return res.status(400).json({ success: false, data: patrimonios })
        }

        return res.status(200).json({ success: true, data: patrimonios })
    }
}