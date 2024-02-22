import { NextFunction, Request, Response } from "express";
import { GetManutencoesAtivasUseCase } from "./GetManutencoesAtivasUseCase";

export class GetManutencoesAtivasController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const manutecoes = await GetManutencoesAtivasUseCase.execute()

        if (!manutecoes) {
            return res.status(500).json({ success: false, message: 'Erro interno do servidor.' })
        }

        if (!manutecoes[0]) {
            return res.status(400).json({ success: false, data: manutecoes })
        }
        
        return res.status(200).json({ success: true, data: manutecoes })
    }
}